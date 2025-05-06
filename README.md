## Run the Django app on development server

### 📝 Environment setup

If your lab workspace has been reset, pull the latest code from your GitHub repository.

```bash powershell
cd /home/project/xrwvm-fullstack_developer_capstone/server
python3 -m pip install --user virtualenv
python3 -m virtualenv djangoenv
.\djangoenv\Scripts\activate
python3 -m pip install -U -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate

cd /home/project/xrwvm-fullstack_developer_capstone/server/frontend
npm install
npm run build

```

**Recreate the virtual environment**:

```bash
python3 -m pip install --user virtualenv
python3 -m virtualenv djangoenv
source djangoenv/bin/activate
```

**Install Python dependencies**:

```bash
python3 -m pip install -U -r requirements.txt
```

**Apply database migrations**:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

---

### 🔑 Create a Django superuser

If not already created:

```bash
python3 manage.py createsuperuser
```

Follow the prompts (Username, Email, Password).

---

### 🎨 Build the client-side (React frontend)

Open a new terminal **(keep the virtual environment active)**:

```bash
cd /home/project/xrwvm-fullstack_developer_capstone/server/frontend
npm install
npm run build
```

---

### ⚙ Update Django settings

**In `server/djangoproj/settings.py`:**

Under `TEMPLATES`, update `DIRS`:

```python
'DIRS': [
    os.path.join(BASE_DIR, 'frontend/static'),
    os.path.join(BASE_DIR, 'frontend/build'),
    os.path.join(BASE_DIR, 'frontend/build/static'),
],
```

Update `STATICFILES_DIRS`:

```python
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/static'),
    os.path.join(BASE_DIR, 'frontend/build'),
    os.path.join(BASE_DIR, 'frontend/build/static'),
]
```

Set `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`:

```python
ALLOWED_HOSTS = [
    'localhost',
    'https://cornnahum-8000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai'
]
CSRF_TRUSTED_ORIGINS = [
    'https://cornnahum-8000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai'
]
```

---

### 🚀 Run the development server

```bash
python3 manage.py runserver 0.0.0.0:8000
```

✅ You should see:

```
Starting development server at http://0.0.0.0:8000/
```

---

### 🌐 Access the app

Use your Theia proxy URL:

- Home: `https://cornnahum-8000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/`
- About Us: `/about`
- Contact Us: `/contact`
- Admin: `/admin` (login with the superuser account you created)

---

### 📸 Submission Notes

- Take a screenshot of the running server (`django_server.png` or `django_server.jpg`).
- Take screenshots of:
  - Home page
  - About Us page
  - Contact Us page
- Make sure the browser URL is visible in the screenshots.
- Submit your GitHub repo URL and screenshots for peer review.

