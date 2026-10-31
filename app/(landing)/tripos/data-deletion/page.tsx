import type { Metadata, Viewport } from "next";
import LegalPage from "@/components/tripos/LegalPage";
import { DATA_DELETION_PATH, LEGAL, PRIVACY_PATH } from "@/lib/tripos/content";

// Static, re-rendered daily so the footer year rolls over without a deploy.
export const revalidate = 86400;

const TITLE = "Data Deletion — TripOS";
const DESCRIPTION =
  "How travel agencies and their customers can ask TripOS to delete personal information, including information received through WhatsApp and Meta.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: DATA_DELETION_PATH },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "TripOS by Golden Travels", title: TITLE, description: DESCRIPTION, url: DATA_DELETION_PATH, images: [] },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, images: [] },
};

export const viewport: Viewport = { themeColor: "#14213D" };

export default function DataDeletionPage() {
  const mail = <a href={LEGAL.mailHref}>{LEGAL.email}</a>;

  return (
    <LegalPage
      title="How to request deletion of your data from TripOS"
      intro={
        <p>
          This page explains how to ask TripOS to delete personal information, including information TripOS received
          through WhatsApp and Meta. For full details, see our <a href={PRIVACY_PATH} className="underline underline-offset-4">Privacy Policy</a>.
        </p>
      }
    >
      <h2 id="agencies">If you are a travel agency using TripOS</h2>
      <p>
        <strong>Delete individual records.</strong> Agency users with the right access can delete leads, customers,
        quotations and files in TripOS. For anything you cannot delete yourself, email us.
      </p>
      <p>
        <strong>Disconnect WhatsApp.</strong> To stop TripOS receiving your WhatsApp messages, remove TripOS in your
        Meta Business settings or under Facebook Settings &gt; Business Integrations, or ask us to disconnect it.
        Disconnecting stops new data. It does not delete what TripOS already stores.
      </p>
      <p>
        <strong>Delete your whole account.</strong> Email {mail} from your account&rsquo;s registered email address,
        with the subject &ldquo;TripOS account deletion&rdquo;. Include your agency name and say whether you want an
        export of your data first. We will delete your agency account and its data, including customer records,
        WhatsApp conversations, quotations and files, except where we must keep information by law. Backup copies are
        removed as backups are overwritten.
      </p>

      <h2 id="customers">If you are a travel customer of an agency</h2>
      <p>
        Your information is in TripOS because an agency you contacted uses it. That includes WhatsApp messages you
        exchanged with them.
      </p>
      <ol>
        <li><strong>Contact the agency first.</strong> They control your records and can delete them in TripOS.</li>
        <li>
          <strong>If you cannot reach the agency,</strong> email {mail} with the subject &ldquo;Data deletion
          request&rdquo;. Include:
          <ul>
            <li>your name;</li>
            <li>the phone number or email address the agency used to contact you;</li>
            <li>the name of the travel agency, if you know it;</li>
            <li>what you want deleted.</li>
          </ul>
        </li>
        <li>
          <strong>We verify and act.</strong> We may ask you to confirm you own that phone number or email address.
          We will tell the agency about the request and delete or anonymise your information, or explain why we
          cannot. We respond within the time required by applicable law.
        </li>
      </ol>

      <h2 id="scope">What deletion covers, and what it doesn&rsquo;t</h2>
      <ul>
        <li>
          <strong>Deleted from TripOS:</strong> your contact details, travel details, notes, quotations, files and
          WhatsApp conversation history stored in TripOS.
        </li>
        <li><strong>Kept where the law requires:</strong> for example billing or tax records, for the period the law sets.</li>
        <li>
          <strong>Not affected:</strong> messages in your own WhatsApp app or the agency&rsquo;s WhatsApp app, and data
          Meta holds under its own policies. To manage that data, use the controls in WhatsApp and{" "}
          <a href="https://www.facebook.com/privacy/policy/" rel="noopener noreferrer">Meta&rsquo;s privacy settings</a>.
        </li>
      </ul>

      <h2 id="questions">Questions</h2>
      <p>
        Contact {LEGAL.operator}, {LEGAL.location}, at {mail}.
      </p>
    </LegalPage>
  );
}
