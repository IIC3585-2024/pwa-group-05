import { AwsClient } from 'aws4fetch';

async function sendNotification(token, title, message) {
    console.log("Sending notification to AWS Lambda function");

    const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
    const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
    const region = import.meta.env.VITE_REGION;

    console.log("Access Key ID:", accessKeyId);

    const client = new AwsClient({ accessKeyId, secretAccessKey, region });

    const url = 'https://grg2xak4za4nayd6rcrzu2bvay0bvdwd.lambda-url.us-east-1.on.aws/';
    const body = JSON.stringify({ "token": token, "title": title, "message": message});

    try {
        const response = await client.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
        const data = await response.json();
        console.log("Response from AWS Lambda function:", data);
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
    }
}

export { sendNotification };
