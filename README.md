
# Fyle Backend

A brief description of what this project does and who it's for

## Run Locally

Clone the project

```bash
  git clone https://github.com/pranjalyadav451/fyle-backend
```

Go to the project directory

```bash
  cd fyle-backend
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

## Environment Variables

To run this project without being rate-limited by github frequently, you will need to add the following environment variables

`GITHUB_TOKEN`

The Project will run fine without the `token` with the only problem being the rate-limit set by Github.

---

## API Reference

#### Get User Details

```http
  GET /users/${username}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Github Username |

---

#### Get Repositories(Public)

```http
  GET /users/${username}/repos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Github Username |

---

#### Get Languages Used in a repository

```http
  GET /repos/${username}/${repo}/languages
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | **Required**. Github Username |
| `repo`    | `string` | **Required**. Repository Name|
