# 🎵 **Song Background Generator**  
A web application that allows users to **upload a song**, **select a theme**, **customize a video**, **preview it**, and **generate a final output with a background**.  

## 🚀 **Live Demo**  
🔗 [**Deployed Frontend**](https://njg37.github.io/upload)  

## ✨ **Features**  
- 🎵 **Music Upload** – Users can upload their songs.  
- 🎨 **Theme Selection** – Choose from multiple background themes.  
- 🎬 **Video Customization** – Customize the video according to preferences.  
- 🔍 **Preview & Final Output** – Preview the generated video before downloading.  

## 🛠 **Tech Stack**  

### **Frontend**  
- ⚛ **React 18** – UI Framework  
- 🌍 **React Router** – Navigation & routing  
- 🎨 **TailwindCSS** – Styling  
- 🔄 **Axios** – API calls  
- 🔔 **React Toastify** – Notifications  

### **Backend**  
- 🚀 **Node.js & Express** – Backend server  
- 📂 **Multer & express-fileupload** – File handling  
- 🎥 **Fluent-FFmpeg** – Video processing  
- 🔒 **CORS & Dotenv** – API security & environment variables  

## 📌 **Installation & Setup**  

### **Frontend Setup**  
```bash
git clone https://github.com/njg37/video_generator.git  
cd video_generator  
npm install  
npm start  
Backend Setup

git clone https://github.com/njg37/video_generator_backend.git  
cd video_generator_backend  
npm install  
node server.js  
📦 Deployment
Frontend: GitHub Pages
Backend: Render
📜 API Routes (Backend)
Endpoint	Method	Description
/upload	POST	Uploads the song file
/theme	GET	Fetches available themes
/generate	POST	Processes video with selected theme
/preview	GET	Returns preview link
/final	GET	Provides final video output
🎥 Usage Flow
1️⃣ Upload a song 🎵
2️⃣ Select a theme 🎨
3️⃣ Customize the video 🎬
4️⃣ Preview the video 🔍
5️⃣ Generate & download the final video 📥