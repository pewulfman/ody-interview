# [Public] Software Engineer / Architect - Partner Integration

**Global Wellness Retreats** specializes in organizing personalized wellness retreats in various locations around the world. These retreats focus on health, relaxation, and rejuvenation, catering to individuals seeking a wellness-focused getaway. GWR collaborates with wellness experts, local resorts, and travel agencies to create bespoke packages for clients.

## **Use Case for API:**

**Objective**: To enhance the personalization of each retreat, GWR needs detailed information about their clients, including their travel preferences and origin countries. This information helps in customizing the retreat experience to suit individual cultural backgrounds and wellness goals.

**Need for API**:

- GWR partners with various travel agencies and wellness platforms that refer clients to them.
- These partners need to securely transmit client data, including email, country of origin, and travel dates, to GWR.
- This data is crucial for GWR to include in their CRM to customize the retreat experience (i.e send them a personalized email ahead of their trip)

## **Test Case: Build a Secure API Endpoint in NodeJS**

**Objective:** Develop a small NodeJS application (you can use the framework of your choice) with an API endpoint to process client data for Global Wellness Retreats.

🔑 The candidate is encouraged to **suggest and implement a security mechanism for authenticating data sent by partner agencies**.

## Requirements

1. **Data Fields**:
    - Client information: **`email`**, **`language`, `countryOfOrigin`, `countryOfDestination`**
    - Travel details: **`travelDateStart`**, **`travelDateEnd`**.
2. **API Endpoint**:
    - Create a `POST` endpoint for receiving client data from GWR partners
3. **Security Mechanism**:
    - The candidate is responsible for proposing and setting up a reliable security method to authenticate requests from partner agencies.
    - The candidate should explain their choice and how it benefits GWR in terms of security and efficiency.
4. **Business Logic**:
    - Validate incoming data against a schema.
    - Store the processed data in the storage of your choice
5. **Error Handling**:
    - Robust error handling for authentication errors, invalid data, and other exceptions.
6. **Testing and Documentation**:
    - Write tests to validate the functionality and security aspects of the API.
    - Document the setup process, API usage, and the rationale behind the chosen security mechanism.

## Evaluation Criteria

- **Functionality**: The application should work as described and correctly authenticate requests
- **Code Quality**: The code should be clean, well-organized, and follow best practices.
- **Security**: The implementation should be secure and robust.
- **Testing**: Tests should cover key functionalities and scenarios.
- **Documentation**: The documentation should be clear, making it easy to understand and run the application.

## Deliverables

The candidate should provide a GitHub repository containing:

- The NodeJS project code.
- Tests for the application.
- A README file with setup instructions and any necessary documentation.
