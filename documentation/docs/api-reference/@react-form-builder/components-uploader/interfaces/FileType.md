# Interface: FileType

Represents a file with upload metadata.

## Properties

### blobFile?

> `optional` **blobFile**: `File`

Source file.

***

### error?

> `optional` **error**: `string`

Error message if upload failed.

***

### fileKey?

> `optional` **fileKey**: `number` \| `string`

File unique identifier.

***

### name?

> `optional` **name**: `string`

File name.

***

### status?

> `optional` **status**: `"error"` \| `"success"`

Upload status.

***

### url?

> `optional` **url**: `string`

The URL of the file that can be previewed.
