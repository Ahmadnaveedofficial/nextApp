import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head>
        <title>Email Verification</title>

        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Your verification code is {otp}</Preview>

      <Body
        style={{
          backgroundColor: "#f4f4f5",
          padding: "40px 0",
          fontFamily: "Roboto, Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "560px",
            margin: "0 auto",
            borderRadius: "12px",
            padding: "40px",
            border: "1px solid #e5e7eb",
          }}
        >
          <Heading
            style={{
              textAlign: "center",
              color: "#111827",
              fontSize: "28px",
              marginBottom: "30px",
            }}
          >
            Verify Your Email
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              color: "#374151",
            }}
          >
            Hi <strong>{username}</strong>,
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#374151",
              lineHeight: "26px",
            }}
          >
            Thank you for signing up! Please use the verification code below to
            complete your registration.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "35px 0",
            }}
          >
            <Text
              style={{
                display: "inline-block",
                backgroundColor: "#111827",
                color: "#ffffff",
                fontSize: "34px",
                fontWeight: "bold",
                letterSpacing: "10px",
                padding: "18px 36px",
                borderRadius: "10px",
                margin: 0,
              }}
            >
              {otp}
            </Text>
          </Section>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "15px",
              lineHeight: "24px",
            }}
          >
            This verification code will expire in <strong>10 minutes</strong>.
          </Text>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "15px",
              lineHeight: "24px",
            }}
          >
            If you didn't create an account, you can safely ignore this email.
          </Text>

          <Hr style={{ margin: "30px 0" }} />

          <Text
            style={{
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "13px",
            }}
          >
            © {new Date().getFullYear()} Mystery Message.
            <br />
            All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}