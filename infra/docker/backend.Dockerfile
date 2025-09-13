# Backend image (Flask)
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

ENV FLASK_ENV=development \
    DB_HOST=db \
    DB_PORT=5432 \
    DB_NAME=prompt_builder \
    DB_USER=postgres \
    DB_PASSWORD=postgres

EXPOSE 5000

CMD ["python", "run.py"]


