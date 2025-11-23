import { EmailSvg } from "@/components/common/EmailSvg";

export const CheckEmailPage = () => {
  return (
    <div className="min-h-screen w-full bg-fl-primary/10 flex items-center justify-center px-4">
      <div className="bg-fl-bg rounded-2xl shadow-xl p-10 max-w-md w-full text-center flex flex-col items-center gap-6">
        {/* Email Icon */}
        <EmailSvg />

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-fl-text">
            Check your email
          </h1>
          <p className="text-fl-text-sec text-sm leading-relaxed">
            We sent a verification link to your inbox. Open the email and verify
            to continue.
          </p>
        </div>

        {/* Button */}
        <a
          href="https://mail.google.com/mail/u/0/"
          className="px-5 py-2 text-white bg-fl-primary rounded-xl font-medium hover:bg-fl-primary-hover transition"
        >
          Verify your email
        </a>
      </div>
    </div>
  );
};
