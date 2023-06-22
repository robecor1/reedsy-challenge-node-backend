# reedsy-challenge-node-backend
## Novels versioning

### 1. Introduction

This document aims to introduce a system design for a feature that encapsulates versioning control for a novel entity.
The problems we aim to solve are:
- being able to view the up-to-date novel;
- being able to view any version of the novel from its past iterations;
- having a way to show the difference between two versions;
- make disk space efficiency a priority;
- take into consideration the trade-offs and consider different solutions for them;
- take into consideration any potential domain-specific issues


### 2. High level architecture

We can start off from ground zero. What is a novel? A novel can be considered a file that contains some content (text / string) and some meta information (file name, size, etc...).
If we think of a real life situation a novel is a type of text file that contains string content with format information (text size, position, bold, etc...).
In order to build a system that can store, and keep track of versions of such a file we will need to think of a way to store such information, keep track of past versions and server it in any form it is / was.
At a higher level we will store such information in a way that each time the file it modified, its content and meta info is saved separately from the previous ones.

### 3. Going into the details

First things first, how are we going to store the novel? Just save the current version each time the user saves its work. This will work to have the most current file, but it will not keep past versions.
What we need to do is each time we need to store its info we create a new file and point the current index (pseudo term for now, more info on storage section) to it. This solves owr problem with versioning, but it bumps into another one,
the one with disk space. As the novel gets bigger and bigger each new file adds more disk space and by the time the one file gets to lets say 50MB, the entire collection of versions could get to GB's of data and that's just for 1 novel.

A different approach would be instead of storing the new file, store the difference, or in another way, the delta of the new version with the previous version.
For example if version 0.1 contains the text `Lorem` and version 0.2 contains `Lorem ipsum`, instead of storing the whole text for 0.2, we instead store just the difference that it adds ` ipsum`.

For example:
- 0.1: adds `Lorem`
- 0.2: adds ` ipsum`
- 0.3: ...

In this way every version can be obtained by applying the delta to the previous version.
This pattern is called delta chaining, and it greatly reduces the disk space requirement, but it greatly lowers the speed at which data is returned to user. This is because in order to obtain any version of the file you need all the previous deltas and then process them to construct it.
There are a couple of wait to mitigate this, which we will cover in the next section

### 4. Storage

When we think of storage we have 2 main options: CDN and database

1. CDNs are very useful for serving static content like large files, such is in our case, but not very good when it comes to manipulating data or, in our case inserting large amount of small data with a couple of relations.
2. Databases are perfect for the case where we need to store a large amount of small data (versions/deltas) with relations to the system entities (user, author, novel, etc...), but not that good when it comes to storing an entire file.

My proposed solution is to use a combination of both. In the database we store the novel information (author, editor, etc...) and make one of the fields contain the url to the CDN where the most recent version of the file resides.
In another table we store the versions of the novel with its respective information (novelId, timestamp, delta information, etc...). In this manner we can get the best of the both worlds, but we still have a problem we need to deal with: speed.
Continuing from the previous section we need a way to mitigate the slow speed of viewing a version. Like I said before to construct a novel to a previous versions we need to iterate to all its past version and construct the file from the deltas.
Some solutions that would help mitigate are:

#### 1. Snapshots
This method proposes that every n-th version we store in db, we also store in the CDN current novel as a file. This way when we want to reconstruct a version we just need to apply the version deltas to the most recent snapshot relative to the version you want to view.
Of course this again comes at the cost of some disk space as we store some more files, but it all depends on how we configure that n-number.

#### 2. Reverse chain
We need to consider that in the real world the most recent versions are fetched the most. It doesn't really make sense for a user to view the first iterations of a novel, as opposed to new versions.
Taken this into consideration we could change the deltas so that the old versions can be obtained from applying the delta to its nex version, reversing the initial logic.

#### 3. Performance enhancements and combinations
If we use the snapshot method, we could compress the files so that we can win some disk space, but, as always at the cost of a bit of speed. This trade-off is in favor of space.
Another option is to combine method 1 with method 2 where we reverse the delta chain and use snapshot.

### 5. Data structure

In this section we go more in-depth in how we can structure our data to achieve our goal. We will assume that we use a delta chain with snapshots as our method.
Looking at our database and the novel entity we can create a table for its information that would have the following fields:
````
- id: generic ID field
- authorId: secondary key for maybe a user object
- name: novel name
- ...
- url: absolute uri to the CDN for the novel
````

For the versions of the novel we would have another table with the following fields:
````
- id: generic ID field
- novelId: secondary key pointing to the novel object
- timestamp: the date/time object for the version
- versionNumber: the number of the version
- delta: a list of changes that apply to a previous version or a snapshot to obtain the current one
````

The interesting field here is the `delta` one. In order to construct this data we need to understand what a change is for a novel. Let's assume that a novel is a big chunk of text, or in programmer terms a `string`.
If we think this way than a change is no more than inserting and / or removing text at a specific index. For the sake of simplicity we will go with this assumption, since in a real scenario, a book has more information as title, chapters, pages, footers, etc...
With this being said we know that a delta is a list of edits that are applied in order to the previous version, where an edit would look like this:

```json
{
  "index": 5,
  "insert": "substring"
}
```
or
```json
{
  "index": 5,
  "delete": 10
}
```

where:
- `index` specifies the index where the change is made
- `insert` adds a substring to that index
- `delete` removes a number of character starting from the index

Showing differences between versions is just a mater of showing the list of edits in the `delta` field of a version, to compare what changed from the previous one.

For the snapshots we have 2 options:

1. Add on optional field to the versions table `snapshotUrl` the points to the snapshot URI created for that version
2. Create a new table for snapshot with the following fields:
````
- id: generic ID field
- novelId: secondary key pointing to the novel object
- versionId: secondary key pointing to the version object from which it was created
- url: absolute uri to the CDN for the snapshot
````

Option 1 is more efficient in disk space since we don't create another table just for snapshots, and we can extract the information from the version itself, but option 2 offer more data integrity since the logic can be decoupled from the versioning logic.

### 6. Closing thoughts

In the end we have the possibility of fetching the most current novel file from CDN as well as viewing past version and comparing them if needed using the `versions` table as well as the list of edits each one contains.
Snapshots help reduce the processing speed of versions and the scale of the trade-off greatly depends on the frequency they are being created on.
