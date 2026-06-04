# Zoom Digital Folder API Integration

## 1. Create Folder
**`POST /api/folders`**
Creates a new folder on the file server. 
- **Payload:** Send a JSON object with `name` and optional `parent_folder_id`. Use `null` for root level.
- **Headers:** `x-api-key: YOUR_API_KEY`
- **Response:** `201 Created` with the new folder's details.

```json
{
  "name": "Invoices",
  "parent_folder_id": null 
}
```

## 2. List Root Folders
**`GET /api/folders/root`**
Fetches paginated root-level folders with their children and files.
- **Query Params:** `per_page` (default 20), `page`
- **Headers:** `x-api-key: YOUR_API_KEY`
- **Response:** `200 OK` with paginated data containing nested children and files.

## 3. Get Folder Details
**`GET /api/folders/{id}`**
Fetches a specific folder with its parent info, direct children, and files.
- **Headers:** `x-api-key: YOUR_API_KEY`
- **Response:** `200 OK` with folder, `parent`, `children`, and `files`.

## 4. Rename Folder
**`PUT /api/folders/{id}`**
Renames an existing folder.
- **Payload:** JSON with the new `name`.
- **Headers:** `x-api-key: YOUR_API_KEY`
- **Response:** `200 OK` with updated folder details.

```json
{
  "name": "New Folder Name"
}
```

## 5. Delete Folder
**`DELETE /api/folders/{id}`**
Moves the folder and all its contents (sub-folders & files) to the trash.
- **Headers:** `x-api-key: YOUR_API_KEY`
- **Response:** `200 OK` confirming the move to trash.
