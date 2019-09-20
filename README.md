# ARTube API Server

## Getting Started

### Prerequisites

| Required                            | Description                                                               |
| ----------------------------------- | ------------------------------------------------------------------------- |
| [Git](https://git-scm.com/)         | We follow the [GitHub Flow](https://guides.github.com/introduction/flow/) |
| [Node.js](nodejs.org)               | 10.16.3 LTS                                                               |
| [MongoDB](https://www.mongodb.com/) | We use [mLab](https://mlab.com/)                                          |
| [npm](https://www.npmjs.com/)       | 6.9.0 or above                                                            |

### Install Node, npm

The project manages the version of node through `nvm`.

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ command -v nvm
$ nvm install 10.16.3
$ which node
```

In the project root as follows are performed through the `.nvmrc`

```
$ nvm use
...
```

## npm CLIs

### Set environment variables

Our project need to set two environment variables to run: `DB_URL`, `JWT_TOKEN_SECRET_KEY`

There are two options for setting them.

#### Option 1. Using a `.env` file

Create `.env` file in our project root and set two variables.

```
# .env file
DB_URL=<mongodb-url>
JWT_TOKEN_SECRET_KEY=<secret-key>
```

#### Option 2. Using the command line

```bash
$ export DB_URL=<mongodb-url>
$ export JWT_TOKEN_SECRET_KEY=<secret-key>
```

### Install project

```bash
$ nvm use
$ npm install
```

### Test

```bash
$ npm test
```

### Run

```bash
$ npm start
```

## Linting & Formatting

We use [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for formatting our javascript code. In Addition, we use [Husky](https://www.npmjs.com/package/husky) to prevent bad `git commit`, `git push`.

## Contributing

In general, we follow the "fork-and-pull" Git workflow.

### 1. Fork this repository

Fork this repository by clicking on the fork button on the top of this page.
This will create a copy of this repository in your account.

### 2. Clone the repository

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the clone button and then click the _copy to clipboard_ icon.

Open a terminal and run the following git command:

```
git clone "url you just copied"
```

where "url you just copied" (without the quote marks) is the url to this repository (your fork of this project). See the previous steps to obtain the url.

For example:

```
git clone https://github.com/username/artube-api-server.git
```

where `username` is your GitHub username. Here you're copying the contents of the first-contributions repository in GitHub to your computer.

### 3. Create a branch

Change to the repository directory on your computer (if you are not already there):

```
cd artube-api-server
```

Now create a branch using the `git checkout` command:

```
git checkout -b <add-your-new-branch-name>
```

For example:

```
git checkout -b add-thumnail
```

(The name of the branch does not need to have the word _add_ in it, but it's a reasonable thing to include because the purpose of this branch is to add your name to a list.)

### 4. Make necessary changes and commit those changes

Add those changes to the branch you just created using the git add command:

```
git add .
```

Now commit those changes using the `git commit` command:

```
git commit -m "<commit-message>"
```

replacing `<commit-message>` with your message.

#### _We use [Husky](https://www.npmjs.com/package/husky) to prevent bad `git commit`, `git push`._

### 5. Push changes to GitHub

Push your changes using the command `git push`:

```
git push origin <add-your-branch-name>
```

replacing `<add-your-branch-name>` with the name of the branch you created earlier.

### 6. Pull request so that we can review your changes

If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button.

Now submit the pull request.

Soon I'll be merging all your changes into the master branch of this project. You will get a notification email once the changes have been merged.
