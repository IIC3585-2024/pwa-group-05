import { AwsClient } from 'aws4fetch';

async function sendNotification(token) {
    console.log("Sending notification to AWS Lambda function");

    const client = new AwsClient({
        accessKeyId: 'AKIA47CRZ5X7TVXLSQEV',
        secretAccessKey: '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',
        region: 'us-east-1'
    });

    const url = 'https://grg2xak4za4nayd6rcrzu2bvay0bvdwd.lambda-url.us-east-1.on.aws/';

    const body = JSON.stringify({ "token": token });

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
