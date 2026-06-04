# Zoom Digital Integration Guide (Folder & Image Upload)

This documentation provides a comprehensive overview of how the **Muster ERP CRM** system integrates with the **Zoom Digital API** for managing folders and files (images).

## English Documentation

### 1. Folder Management
The system allows users to create, rename, and delete nested folders in a media library structure.

* **Create Folder**: 
  When a user creates a new folder from the frontend UI, the backend sends a `POST` request to `api/folders` on Zoom Digital. It passes the `parent_folder_id` if the folder is nested. Zoom Digital creates the external folder and returns a `zoomFolderId`. The backend then saves this ID along with the folder details in the local Prisma Database.
* **Rename Folder**:
  When a folder is renamed, a `PUT` request is sent to `api/folders/{zoomFolderId}` to keep the Zoom CDN in sync.
* **Delete Folder**:
  When deleted, a `DELETE` request is sent to `api/folders/{zoomFolderId}` on Zoom Digital, and the folder is subsequently deleted from the local database.

### 2. Image Management (Upload, Rename, Delete)
Files are physically stored on Cloudflare R2 via the Zoom Digital API, while metadata is stored locally.

* **Upload Image**: 
  The frontend sends a `multipart/form-data` request with the selected image. The backend forwards this file to `POST api/files` on Zoom Digital using `form-data`. 
  Once Zoom returns the uploaded `zoomFileId`, the backend immediately makes a secondary `POST` request to `api/files/{zoomFileId}/download-link` to securely fetch the CDN image URL (`img.url`). This CDN URL is saved locally in the Prisma `Image` model. 
  The frontend then directly loads the image using this CDN URL (`<img src={img.url} />`), fully bypassing the local server for performance!
* **Rename Image**:
  By right-clicking an image in the Media Library, users can rename it. This triggers a `PUT` request to `api/files/{zoomFileId}` to update the filename externally, and then updates the local database.
* **Delete Image**:
  Right-clicking and deleting an image triggers a `DELETE` request to `api/files/{zoomFileId}`. The image is wiped from Cloudflare R2 and the local database.

---

## বাংলা ডকুমেন্টেশন (Bengali Documentation)

### ১. ফোল্ডার ম্যানেজমেন্ট (Folder Management)
সিস্টেমটি মিডিয়া লাইব্রেরিতে ফোল্ডার তৈরি, রিনেম এবং ডিলিট করার সুবিধা দিয়ে থাকে।

* **ফোল্ডার তৈরি (Create)**: 
  ইউজার যখন ফ্রন্টএন্ড থেকে নতুন ফোল্ডার তৈরি করেন, তখন ব্যাকএন্ড থেকে Zoom Digital API এর `api/folders`-এ একটি `POST` রিকোয়েস্ট পাঠানো হয়। এটি নেস্টেড ফোল্ডার হলে এর `parent_folder_id`-ও পাঠানো হয়। Zoom Digital ফোল্ডারটি তৈরি করে একটি `zoomFolderId` রিটার্ন করে। ব্যাকএন্ড তখন এই আইডিটি লোকাল Prisma ডাটাবেজে ফোল্ডারের অন্যান্য ইনফরমেশনের সাথে সেভ করে রাখে।
* **ফোল্ডার রিনেম (Rename)**:
  ফোল্ডারের নাম পরিবর্তন করলে Zoom CDN এর সাথে সিঙ্ক রাখার জন্য `api/folders/{zoomFolderId}`-এ একটি `PUT` রিকোয়েস্ট পাঠানো হয়।
* **ফোল্ডার ডিলিট (Delete)**:
  ফোল্ডার ডিলিট করার সময় Zoom Digital এর `api/folders/{zoomFolderId}`-এ একটি `DELETE` রিকোয়েস্ট পাঠানো হয়। এরপর লোকাল ডাটাবেজ থেকেও ফোল্ডারটি সম্পূর্ণ মুছে ফেলা হয়।

### ২. ইমেজ ম্যানেজমেন্ট (Image Management)
ফাইল বা ইমেজগুলো ফিজিক্যালি Zoom Digital API এর মাধ্যমে Cloudflare R2-তে স্টোর করা হয়, এবং মেটাডাটা লোকাল সার্ভারে থাকে।

* **ইমেজ আপলোড (Upload)**: 
  ফ্রন্টএন্ড থেকে একটি ইমেজ `multipart/form-data` আকারে ব্যাকএন্ডে পাঠানো হয়। ব্যাকএন্ড সেই ইমেজটিকে সরাসরি Zoom Digital এর `POST api/files` এন্ডপয়েন্টে ফরোয়ার্ড করে দেয়। 
  Zoom যখন আপলোড হওয়া ইমেজের `zoomFileId` রিটার্ন করে, তখন ব্যাকএন্ড সাথে সাথেই `api/files/{zoomFileId}/download-link`-এ একটি `POST` রিকোয়েস্ট করে ইমেজটির সিকিউর CDN লিংক (CDN URL) নিয়ে আসে। এই লিংকটি Prisma-এর `Image` মডেলে সেভ করে রাখা হয়।
  পরবর্তীতে ফ্রন্টএন্ড থেকে আমাদের লোকাল সার্ভারকে বাইপাস করে সরাসরি এই CDN লিংকটি ব্যবহার করেই (`<img src={img.url} />`) ইমেজ লোড করা হয়, যার ফলে ওয়েবসাইট অনেক দ্রুত কাজ করে!
* **ইমেজ রিনেম (Rename)**:
  মিডিয়া লাইব্রেরিতে ইমেজের ওপর রাইট-ক্লিক করে ইউজাররা ইমেজের নাম পরিবর্তন করতে পারেন। এতে `api/files/{zoomFileId}`-এ একটি `PUT` রিকোয়েস্ট যায়, যা এক্সটার্নাল সার্ভারে ইমেজের নাম আপডেট করে এবং লোকাল ডাটাবেজেও চেঞ্জ করে দেয়।
* **ইমেজ ডিলিট (Delete)**:
  রাইট-ক্লিক করে ইমেজ ডিলিট করলে Zoom API এর `api/files/{zoomFileId}`-এ `DELETE` রিকোয়েস্ট যায়। এতে Cloudflare R2 এবং লোকাল ডাটাবেজ – উভয় জায়গা থেকেই ইমেজটি সম্পূর্ণ মুছে যায়।
