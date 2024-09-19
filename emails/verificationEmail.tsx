// custom template

import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }
    : VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Section>
                <Head>
                    <title>Verification Code</title>
                    <Font
                        fontFamily="Roboto"
                        fallbackFontFamily="Verdana"
                        webFont={{
                            url: 'https://fonts.googleapis.com/css?family=Roboto',
                        }}
                        fontWeight={400}
                        fontStyle="normal"
                    />
                </Head>
                <Preview>Here&apos;s your verification code: {otp}</Preview>
                <Row>
                    <Heading as="h2">
                        Hello {username},
                    </Heading>
                </Row >
                <Row>
                    <Text>
                        Thank you for signing up! Please use the following code to verify your email address:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
            </Section>
        </Html >
    )
}
