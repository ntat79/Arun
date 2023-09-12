## Test Automation

### Environment Setup

#### Install Node.js 
[Node JS](https://nodejs.org/en) ,
[VS Code](https://code.visualstudio.com/) and
[Playwright](https://playwright.dev/docs/intro)

### Execution Setup
Clone the project 
```bash
$ git clone https://github.com/ntat79/Arun.git
```
passphrase password if asked during cloning: 'test'

2. #### Install Dependencies

```bash
$ npm install
```

3. Run the test using
```bash
$ npx playwright test --project=chromium --retries=3
```

If there are any failures because of slow network , Please try to run in debug mode
```bash
$ npx playwright test --project=chromium --headed --debug
```

