# Tier IV Playwright Automation Framework

This project is a modern end-to-end automation framework built with Playwright and TypeScript. It is designed to show how a real-world test automation framework can be created from scratch and scaled for practical use in web application testing.

## What this framework demonstrates

This framework covers the full flow of UI automation, from test design to execution and reporting. It includes:

- End-to-end testing of an e-commerce application
- Login, product selection, cart, and checkout flows
- Page Object Model (POM) for reusable and maintainable test code
- Data-driven testing using Excel files
- PDF-related validation scenarios
- Visual comparison testing
- HTML and Allure reporting for clear test results

## Framework journey: from scratch to completion

1. Project setup
   - Created a Node.js-based automation project
   - Added Playwright, TypeScript, and supporting libraries
   - Configured the project for browser-based automated testing

2. Test architecture
   - Organized test cases under the tests folder
   - Built reusable page classes under the pages folder
   - Separated test logic from UI actions for better maintenance

3. Automation design
   - Used Playwright Test for reliable browser automation
   - Implemented structured test flows for common user journeys
   - Designed the framework to be easy to expand with more scenarios

4. Data and advanced testing
   - Added Excel-based data handling for parameterized testing
   - Included PDF validation to cover non-standard business requirements
   - Implemented visual testing to catch UI regressions

5. Reporting and visibility
   - Generated HTML reports for easy review
   - Integrated Allure reporting for richer execution insights
   - Made failure evidence easy to understand for stakeholders

## Project structure

- tests/ - Test scenarios and specifications
- pages/ - Page Object Model classes for each application page
- test data/ - External data files used in tests
- playwright-report/ - HTML test execution reports
- allure-results/ and allure-report/ - Allure test results and reports

## How to run the tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Allure report execution

To generate and view the Allure report, follow these steps:

1. Install Allure command-line tool if it is not already available:

```bash
npm install -g allure-commandline --save-dev
```

2. Run the tests with Allure results enabled:

```bash
npx playwright test --reporter=line,allure-playwright
```

3. Generate the Allure report from the results:

```bash
allure generate allure-results --clean -o allure-report
```

4. Open the report in the browser:

```bash
allure open allure-report
```

## Why this framework is strong

This framework is not just a set of test scripts. It is built with professional automation principles such as:

- Reusability
- Maintainability
- Clear separation of concerns
- Scalability for future enhancements
- Better collaboration between QA and stakeholders

