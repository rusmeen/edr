# EDR

## Backend local Setup (requires Python 3.6)

- Clone repo & cd edr
- Setup virtual environment (`python3.6 -m venv env .`)
- Activate virtual environment (`source env/bin/activate`)
- Install requirements (`pip install -r requirements.txt`)
- Create env file `touch .env`
- Add required variables inside .env file:

```
DEBUG=True (True for local False for production)
SECRET_KEY=""   (use django project secret key here, can be generated via https://djecrety.ir/)
DB_NAME=""
DB_USERNAME=""
DB_PASSWORD=""
```

- cd backend
- Run migrations (`python manage.py makemigrations`, `python manage.py migrate`)
- Run server (`python manage.py runserver`)
- See it running on http://127.0.0.1:8000/api/v1/users/
