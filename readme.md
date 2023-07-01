# Technical Test Backend Developer - JASA MARGA

This is a sample API documentation for the Login and CRUD functionality.

## Table of Contents
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Login](#login)
  - [Register](#register)
  - [RefreshToken](#refreshtoken)
  - [GetRuas](#getruas)
  - [GetOneRuas](#getoneruas)
  - [CreateRuas](#createruas)
  - [UpdateRuas](#updateruas)
  - [DeleteRuas](#deleteruas)
  - [ImportRuas](#importruas)

## Introduction

This API provides login functionality to authenticate users and perform CRUD and Import operations on a resource.

## Requirements

- Node.js >= 16.16.0
- PostgreSQL >= 12.4

## Installation

1. Clone this repository.
2. Install dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file and copy the contents from `.env.example` file.
4. Set the environment variables in `.env` file.
5. Run the application.
   ```bash
   npm start
   ```

## Authentication

To access the protected endpoints, you need to include the authentication token in the request headers. Obtain the token by making a login request with valid credentials. But if you want to use a cookie it can be to. The token is valid for 1 hour. After that, you need to refresh the token for a new one.

## Endpoints

### Login

Authenticate user and obtain an access token.

- **Endpoint**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "example_user",
    "password": "password123"
  }

- **Response Body**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJnaHoxMiIsImZ1bGxuYW1lIjoiTXVoYW1tYWQgR2hlemFrIiwiaWF0IjoxNjg4MjE3MjI2LCJleHAiOjE2ODgyMjA4MjZ9.Dj9_dwT8n6FK6yBAd8dSzTejDDt8DTrIdOYc2voogZ4",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJnaHoxMiIsImZ1bGxuYW1lIjoiTXVoYW1tYWQgR2hlemFrIiwiaWF0IjoxNjg4MjE3MjI2LCJleHAiOjE2ODgzMDM2MjZ9.XNihSADC9_KwuwLsEQGgECu9p3EjQf1I6ZfN0kkKJH0",
    "data": {
        "id": 1,
        "username": "example_user",
        "fullname": "Example User"
    }
  }

### Register

Register new user.

- **Endpoint**: `/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "fullname": "Example User",
    "username": "example_user",
    "password": "password123"
  }

- **Response Body**:
  ```json
  {
    "message": "User has been created"
  }

### Refresh Token

Refresh access token.

- **Endpoint**: `/refresh-token`
- **Method**: `GET`
- **Request Header**: `Authorization: Bearer <refresh_token>` or `Cookie: refresh_token=<refresh_token>`

- **Response Body**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJnaHoxMiIsImZ1bGxuYW1lIjoiTXVoYW1tYWQgR2hlemFrIiwiaWF0IjoxNjg4MjE3NjA4LCJleHAiOjE2ODgyMjEyMDh9.zYhboreSqZW_meVpkesP3ez1rOzCIcS2SM-H1tZ60mI",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJnaHoxMiIsImZ1bGxuYW1lIjoiTXVoYW1tYWQgR2hlemFrIiwiaWF0IjoxNjg4MjE3MjI2LCJleHAiOjE2ODgzMDM2MjZ9.XNihSADC9_KwuwLsEQGgECu9p3EjQf1I6ZfN0kkKJH0",
    "data": {
        "id": 1,
        "username": "example_user",
        "fullname": "Example User"
    }
  }

### GetRuas

Get all ruas.

- **Endpoint**: `/ruas`
- **Method**: `POST`
- **Request Header**: `Authorization: Bearer <access_token>` or `Cookie: access_token=<access_token>`
- **Request Body**:
  ```json
  {
    "page": 1,
    "perPage": 10,
    "search": "",
    "sort": "",
    "sortColumn": ""
  }

- **Response Body**:
  ```json
  {
    "data": [
        {
            "id": 1,
            "ruas": "Ruas 15",
            "km_awal": "900",
            "km_akhir": "1000",
            "status": false,
            "created_by": "ghz12",
            "updated_by": "ghz12",
            "created_at": "2023-07-01T06:24:35.131Z",
            "updated_at": "2023-07-01T06:24:35.131Z",
            "coordinates": [
                {
                    "id": 1,
                    "ruas_id": 1,
                    "coordinates": "123.456,789.012",
                    "created_by": "ghz12",
                    "updated_by": "ghz12",
                    "created_at": "2023-07-01T06:24:35.139Z",
                    "updated_at": "2023-07-01T06:24:35.139Z"
                },
                {
                    "id": 2,
                    "ruas_id": 1,
                    "coordinates": "345.678,901.234",
                    "created_by": "ghz12",
                    "updated_by": "ghz12",
                    "created_at": "2023-07-01T06:24:35.139Z",
                    "updated_at": "2023-07-01T06:24:35.139Z"
                }
            ]
        }
    ],
    "total": 1
  }

## Get One Ruas

Get one ruas.

- **Endpoint**: `/ruas-one`
- **Method**: `POST`
- **Request Header**: `Authorization: Bearer <access_token>` or `Cookie: access_token=<access_token>`
- **Request Body**:
  ```json
  {
    "id": 1
  }

- **Response Body**:
  ```json
  {
    "data": {
        "id": 1,
        "ruas": "Ruas 15",
        "km_awal": "900",
        "km_akhir": "1000",
        "status": false,
        "created_by": "ghz12",
        "updated_by": "ghz12",
        "created_at": "2023-07-01T06:24:35.131Z",
        "updated_at": "2023-07-01T06:24:35.131Z",
        "coordinates": [
            {
                "id": 1,
                "ruas_id": 1,
                "coordinates": "123.456,789.012",
                "created_by": "ghz12",
                "updated_by": "ghz12",
                "created_at": "2023-07-01T06:24:35.139Z",
                "updated_at": "2023-07-01T06:24:35.139Z"
            },
            {
                "id": 2,
                "ruas_id": 1,
                "coordinates": "345.678,901.234",
                "created_by": "ghz12",
                "updated_by": "ghz12",
                "created_at": "2023-07-01T06:24:35.139Z",
                "updated_at": "2023-07-01T06:24:35.139Z"
            }
        ]
    }
  }

## Create Ruas

Create new ruas.

- **Endpoint**: `/create-ruas`
- **Method**: `POST`
- **Request Header**: `Authorization: Bearer <access_token>` or `Cookie: access_token=<access_token>`
- **Request Body**:
  ```json
  {
    "ruas": "Ruas 15",
    "km_awal": 900,
    "km_akhir": 1000,
    "status": false,
    "detail": ["123.456,789.012", "345.678,901.234"]
  }

- **Response Body**:
  ```json
  {
    "message": "Ruas created successfully"
  }

## Update Ruas

Update ruas.

- **Endpoint**: `/update-ruas`
- **Method**: `POST`
- **Request Header**: `Authorization: Bearer <access_token>` or `Cookie: access_token=<access_token>`
- **Request Body**:
  ```json
  {
    "id": 1,
    "ruas": "Ruas 1",
    "km_awal": 910,
    "km_akhir": 1100,
    "status": true,
    "detail": [
        {
            "id": 35,
            "coordinates": "345.678,901.234"
        },
        {
            "id": 36,
            "coordinates": "123.456,789.012"
        },
        {
            "coordinates": "901.234,567.890"
        }
    ]
  }

- **Response Body**:
  ```json
  {
    "message": "Ruas updated successfully"
  }

## Delete Ruas

Delete ruas.

- **Endpoint**: `/delete-ruas`
- **Method**: `POST`
- **Request Header**: `Authorization: Bearer <access_token>` or `Cookie: access_token=<access_token>`
- **Request Body**:
  ```json
  {
    "id": 1
  }

- **Response Body**:
  ```json
  {
    "message": "Ruas deleted successfully"
  }

## Import Ruas

Import ruas from excel file.

- **Endpoint**: `/import-ruas`
- **Method**: `GET`
- **Request Header**: `Authorization: Bearer <access_token>` or `Cookie: access_token=<access_token>`

- **Response Body**: `File`
