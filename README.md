## Bug Fixed:

- Initially, even without the weather data, the city-weather component was rendering. So, I’ve added a condition so that after the `componentDidMount` runs the data will be available for render.
- Also, added a `componentDidUpdate` method which will update the weather data whenever the city changes.

## Thoughts:

- A reset button would have been great.
- The search would’ve been better on key up rather than the submit button. With this we could’ve utilized the `<input type=”search”>` field to clear the searched text.
- The searched city could’ve been memoized so that the next same city searched could’ve referenced back from cache.

## Known Compromises:

- Typescript on the codebox was not working properly. So, types might not be perfect.
- Only wrote a test case for the main index page & the component.
- Didn’t include test cases for 404 cities.
- Could’ve used libraries like SWR to make API requests but went with fetch instead.

# Hilton Web Assessment ![Logo](https://uploads.codesandbox.io/uploads/avatars/Mq9C-SE-01.png)

For this code assessment, we expect you to make the changes listed in the `Deliverables` sections and then email us the link to your codesandbox instance that has your changes. (As soon as you make a change and save it, it will fork this project and create a unique url for you).

## Setup

You need to sign up for an OpenWeather API key. Instructions are here: https://openweathermap.org/appid

After you get your API, add that as <samp>API_KEY</samp> in <samp>city-weather.tsx</samp>

**Note:** Generated OpenWeather API key can take up to 2 hours before it's usable.

## Bug report

**Steps to reproduce:**

1. Type a valid US city in the "Weather Search" box
1. Press <samp>{enter}</samp>

**Expected results:** User should see the current weather results for that city

**Actual results:** App crashes

## Deliverable 1:

1. Fix the bug in [city-weather.tsx](components/city-weather.tsx) file.
   - Treating this like a bug ticket, identify the bug in the application and provide a fix.
2. Talk about your changes
   - Write a short description about what was the underlying cause of the bug and how you fixed it

## Deliverable 2:

1. Create a new <samp>components/city-weather-refactor.tsx</samp> file, in which you refactor the `CityWeather` component to use react hooks rather than `React.Component` class. Incorporate the following:

   - Match the design
      - A designer has provided visuals on how this app should look. See [design.png](design.png) for reference.
      - You may need to use different fields from the openweathermap API to match the design. For example, the weather condition three-digit code can be [mapped to the icons here](https://openweathermap.org/weather-conditions).
      - [Tailwind CSS](https://tailwindcss.com/docs/background-color) is installed and configured for you
   - Improve web accessibility
      - Ensure the click event on the "Weather Search" label focuses on the text input. 
      - Make sure a screen reader correctly announces loading states. 
   - Improve unit tests
      - The existing unit test didn't catch the bug, update and add tests to reduce regression. To run your tests, use script below:
      ```
      yarn test
      ```

2. Talk about your changes
   - For the refactoring and accompanying tasks, include thoughts, assumptions, or known compromises you took to complete the assessment.
