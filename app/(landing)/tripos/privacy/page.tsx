import type { Metadata, Viewport } from "next";
import LegalPage from "@/components/tripos/LegalPage";
import { DATA_DELETION_PATH, LEGAL, PRIVACY_PATH, TRIPOS_PATH } from "@/lib/tripos/content";

// Static, re-rendered daily so the footer year rolls over without a deploy.
export const revalidate = 86400;

const TITLE = "Privacy Policy — TripOS";
const DESCRIPTION =
  "How TripOS collects, uses, shares and protects agency, travel customer and WhatsApp information, and how to request access or deletion.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PRIVACY_PATH },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "TripOS by Golden Travels", title: TITLE, description: DESCRIPTION, url: PRIVACY_PATH, images: [] },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, images: [] },
};

export const viewport: Viewport = { themeColor: "#14213D" };

export default function PrivacyPage() {
  const mail = <a href={LEGAL.mailHref}>{LEGAL.email}</a>;

  return (
    <LegalPage
      title="TripOS Privacy Policy"
      intro={
        <p>
          This policy explains what personal information TripOS handles, why we handle it, who we share it with,
          and the choices you have, including how to ask us to delete it.
        </p>
      }
    >
      <h2 id="who-we-are">1. Who we are</h2>
      <p>
        TripOS is a software platform for travel agencies. It is operated by {LEGAL.operator} (&ldquo;TripOS&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a travel business based in {LEGAL.location}.
      </p>
      <p>TripOS helps travel agencies manage their work in one place. Agencies use it to:</p>
      <ul>
        <li>manage their agency account and team members;</li>
        <li>record and follow up on leads and travel customers;</li>
        <li>keep customer details and travel plans;</li>
        <li>connect their WhatsApp Business account and reply to customers from a shared inbox;</li>
        <li>create quotations and generate them as PDF files;</li>
        <li>store documents and files related to trips.</li>
      </ul>
      <p>
        This policy applies to the TripOS platform and to the TripOS pages at{" "}
        <a href={TRIPOS_PATH}>www.goldentravels.co/tripos</a>. It does not cover the travel services Golden Travels
        sells to its own customers. It also does not cover how an individual travel agency uses your information
        outside TripOS.
      </p>

      <h2 id="our-role">2. Our role: agencies and TripOS</h2>
      <p>TripOS is used by two kinds of people, and our role differs for each.</p>
      <ul>
        <li>
          <strong>Agency users.</strong> Agency owners and employees who sign up for and log in to TripOS. For their
          account information, TripOS decides how the information is used.
        </li>
        <li>
          <strong>Travel customers.</strong> People who contact or book with an agency that uses TripOS. The agency
          decides what customer information to enter into TripOS and why. TripOS processes it on the agency&rsquo;s
          behalf, under the agency&rsquo;s instructions and our agreement with the agency.
        </li>
      </ul>
      <p>
        If you are a travel customer, the agency you dealt with is your first point of contact for questions about
        your information. We will help agencies respond to such requests, and you can also{" "}
        <a href="#contact">contact us directly</a>.
      </p>

      <h2 id="information-we-collect">3. Information we collect</h2>
      <h3>3.1 Agency account and employee information</h3>
      <p>When an agency signs up and adds team members, we collect:</p>
      <ul>
        <li>agency name, business details and contact information;</li>
        <li>names, email addresses, phone numbers and job roles of agency users;</li>
        <li>login credentials;</li>
        <li>billing and subscription details, if the agency subscribes to a paid plan;</li>
        <li>settings and preferences, and records of actions users take in TripOS, such as who created or changed a quotation.</li>
      </ul>

      <h3>3.2 Travel customer and lead information</h3>
      <p>
        Agencies enter or import information about their leads and customers, or it arrives through a connected
        channel such as WhatsApp. This can include:
      </p>
      <ul>
        <li>names, phone numbers and email addresses;</li>
        <li>travel details such as destinations, dates, number of travellers, accommodation, transport and budget preferences;</li>
        <li>notes the agency writes about the enquiry or booking;</li>
        <li>quotations, itineraries and prices prepared for the customer;</li>
        <li>documents and files the agency uploads for a trip.</li>
      </ul>
      <p>Agencies should enter only the information they need to serve their customers.</p>

      <h3>3.3 WhatsApp information</h3>
      <p>
        When an agency connects its WhatsApp Business account to TripOS, TripOS receives and stores information
        through Meta&rsquo;s WhatsApp Business Platform so the agency can manage conversations in TripOS. This
        includes:
      </p>
      <ul>
        <li><strong>Phone numbers and profile names.</strong> The customer&rsquo;s WhatsApp phone number and the profile name they have set in WhatsApp.</li>
        <li><strong>Message content.</strong> Text messages, and media or files sent in the conversation, such as images, documents, audio and location, in both directions.</li>
        <li><strong>Conversation history.</strong> The messages exchanged between the agency and the customer through the connected number.</li>
        <li><strong>Message metadata.</strong> Message IDs, timestamps, and delivery and read status reported by WhatsApp.</li>
        <li><strong>Agency account identifiers.</strong> The agency&rsquo;s WhatsApp Business Account ID, business phone number ID, display name and related business information.</li>
        <li><strong>Access credentials.</strong> An access token issued by Meta that lets TripOS send and receive messages for the agency.</li>
      </ul>
      <p>
        TripOS receives only the WhatsApp information related to the business numbers an agency connects. It does
        not receive a customer&rsquo;s other WhatsApp chats or contacts.
      </p>

      <h3>3.4 Information from our website</h3>
      <p>When you visit the TripOS pages or contact us, we may collect:</p>
      <ul>
        <li>information you submit, such as your name, business name, email, phone number and message when you request early access or contact us;</li>
        <li>technical information such as IP address, browser type and pages visited, collected through <a href="#cookies">cookies and similar technologies</a>.</li>
      </ul>

      <h2 id="embedded-signup">4. How WhatsApp Embedded Signup works</h2>
      <p>TripOS uses Meta&rsquo;s Embedded Signup so an agency can connect its WhatsApp Business account without leaving TripOS.</p>
      <ol>
        <li>An agency admin chooses to connect WhatsApp in TripOS. A window provided by Meta opens.</li>
        <li>The admin logs in with their Facebook account in Meta&rsquo;s window. TripOS does not see or receive their Facebook password.</li>
        <li>
          In Meta&rsquo;s window, the admin selects or creates a Meta business portfolio, a WhatsApp Business account
          and a phone number. They then review the permissions TripOS is asking for and approve them.
        </li>
        <li>
          Meta gives TripOS the identifiers of the selected WhatsApp Business account and phone number, and a way to
          get an access token. With that token, TripOS can manage the account and send and receive messages for the
          agency.
        </li>
        <li>After that, Meta delivers messages and status updates for that number to TripOS, and TripOS sends the agency&rsquo;s replies through Meta.</li>
      </ol>
      <p>
        The permissions TripOS requests allow it to manage the connected WhatsApp Business account and to send and
        receive messages. TripOS uses them only to provide WhatsApp messaging inside TripOS for the agency that
        granted them.
      </p>
      <p>
        An agency can disconnect at any time by removing TripOS from its Meta Business settings or from Facebook
        Settings &gt; Business Integrations, or by asking us to disconnect it. Disconnecting stops new WhatsApp
        information reaching TripOS. Information already stored in TripOS stays there until it is deleted as
        described in <a href="#retention">section 10</a> and <a href="#your-rights">section 11</a>.
      </p>

      <h2 id="how-we-use">5. How we use information</h2>
      <p>We use the information described above to:</p>
      <ul>
        <li>provide TripOS to agencies: create accounts, manage leads and customers, build quotations and PDFs, and store files;</li>
        <li>show WhatsApp conversations in the agency&rsquo;s TripOS inbox, and send the replies agency users write;</li>
        <li>link WhatsApp conversations to the matching lead or customer record so the agency can see the full history;</li>
        <li>keep the platform secure, prevent misuse and investigate problems;</li>
        <li>provide support when an agency asks for help;</li>
        <li>communicate with agency users about their account, service changes and, where permitted, product updates;</li>
        <li>meet legal obligations and enforce our terms.</li>
      </ul>
      <p>
        <strong>How we use WhatsApp information specifically.</strong> TripOS processes WhatsApp information only to
        provide the agency&rsquo;s messaging features in TripOS, for the agency that connected the account.
      </p>
      <ul>
        <li>We do not sell WhatsApp information or other personal information.</li>
        <li>We do not use WhatsApp information for advertising, or to build profiles for any purpose other than providing TripOS to the agency.</li>
        <li>We do not use one agency&rsquo;s customer information for another agency, or for Golden Travels&rsquo; own travel business.</li>
      </ul>

      <h2 id="access">6. Who can access information</h2>
      <ul>
        <li>
          <strong>The agency.</strong> Agency users can see the leads, customers, quotations, files and WhatsApp
          conversations in their agency&rsquo;s account, according to the access the agency sets.
        </li>
        <li>
          <strong>TripOS personnel.</strong> Authorised TripOS staff can access agency account data, including
          WhatsApp messages, when it is needed to provide support an agency has asked for, fix technical problems,
          keep the platform secure, or meet legal obligations. Access is limited to what the task needs.
        </li>
      </ul>

      <h2 id="sharing">7. How we share information</h2>
      <p>We share personal information only as described here.</p>
      <ul>
        <li>
          <strong>Meta Platforms.</strong> WhatsApp messages are sent and received through Meta&rsquo;s WhatsApp
          Business Platform. Meta processes these messages and related data under its own terms and policies,
          including the WhatsApp Business terms and{" "}
          <a href="https://www.facebook.com/privacy/policy/" rel="noopener noreferrer">Meta&rsquo;s Privacy Policy</a>.
          TripOS is an independent software provider. It is not owned by or affiliated with Meta, and Meta does not
          control TripOS.
        </li>
        <li>
          <strong>Service providers.</strong> We use other companies to host and run TripOS, such as cloud hosting,
          database and file storage, and email delivery providers. They process information only to provide their
          services to us.
        </li>
        <li><strong>At the agency&rsquo;s direction.</strong> For example, when an agency user sends a quotation PDF to a customer, or exports data.</li>
        <li><strong>Legal reasons.</strong> When required by law, court order or a government request, or to protect the rights, safety or property of TripOS, our users or others.</li>
        <li>
          <strong>Business changes.</strong> If TripOS is merged, acquired or transferred, information may move to
          the new owner. It would remain protected by this policy or one at least as protective.
        </li>
      </ul>
      <p>We do not sell personal information.</p>

      <h2 id="storage">8. Where information is stored</h2>
      <p>
        TripOS information is stored with our hosting and storage providers, whose servers may be in India or other
        countries. Meta may also process WhatsApp messages in other countries. Where information is transferred
        outside India, we take the steps required by applicable law.
      </p>

      <h2 id="security">9. How we protect information</h2>
      <p>
        We use reasonable technical and organisational measures to protect personal information from unauthorised
        access, loss, misuse and alteration.
      </p>
      <p>
        No system is completely secure. If we become aware of a breach affecting personal information, we will
        notify affected agencies and authorities as required by applicable law.
      </p>
      <p>
        Agencies are responsible for keeping their users&rsquo; login details safe and for controlling who in their
        team has access.
      </p>

      <h2 id="retention">10. How long we keep information</h2>
      <p>We keep information only as long as needed for the purposes in this policy.</p>
      <ul>
        <li>
          <strong>Agency account and customer data,</strong> including WhatsApp conversations and files, is kept
          while the agency&rsquo;s account is active. After the account closes, or when the agency asks, it is deleted
          or anonymised, except where we must keep it by law.
        </li>
        <li><strong>Backups</strong> may hold deleted information for a limited time until they are overwritten.</li>
        <li><strong>Website enquiries</strong> are kept for as long as needed to respond and follow up.</li>
        <li><strong>Information we must keep by law,</strong> such as billing records, is kept for the period the law requires.</li>
      </ul>
      <p>
        Deleting information from TripOS does not delete messages from the customer&rsquo;s or agency&rsquo;s WhatsApp
        app, or data held by Meta under its own policies.
      </p>

      <h2 id="your-rights">11. Your rights and choices</h2>
      <p>
        Depending on applicable law, including India&rsquo;s Digital Personal Data Protection Act, 2023, you may have
        the right to:
      </p>
      <ul>
        <li>access the personal information we hold about you;</li>
        <li>correct information that is inaccurate or incomplete;</li>
        <li>ask us to delete your information;</li>
        <li>withdraw consent, where we rely on consent;</li>
        <li>raise a grievance with us, and then with the relevant authority if it is not resolved.</li>
      </ul>
      <p>
        <strong>Agency users</strong> can view and edit much of their information in TripOS. For anything else,
        contact us at {mail}.
      </p>
      <p>
        <strong>Travel customers</strong> should contact the agency they dealt with first, since the agency controls
        their information in TripOS. If you cannot reach the agency, contact us. We will verify the request and work
        with the agency to respond.
      </p>
      <p>
        To request deletion, follow the steps on our <a href={DATA_DELETION_PATH}>Data Deletion page</a>. We may need
        to confirm your identity first, and we may keep some information where the law requires it. We respond within
        the time required by applicable law.
      </p>

      <h2 id="cookies">12. Cookies and analytics</h2>
      <p>The TripOS pages on goldentravels.co use cookies and similar technologies:</p>
      <ul>
        <li><strong>Essential cookies</strong> that keep the site and the TripOS platform working, such as keeping you signed in.</li>
        <li>
          <strong>Advertising measurement.</strong> The website loads the Google Ads tag (Google&rsquo;s gtag.js) to
          measure the results of our ads. Google may set cookies and receive information about your visit under{" "}
          <a href="https://policies.google.com/privacy" rel="noopener noreferrer">Google&rsquo;s privacy policy</a>.
        </li>
      </ul>
      <p>You can block or delete cookies in your browser settings. Some parts of the site may not work properly without them.</p>

      <h2 id="children">13. Children&rsquo;s privacy</h2>
      <p>
        TripOS is a business tool for travel agencies and is not directed at children. Agency accounts may only be
        created by people aged 18 or over. We do not knowingly collect children&rsquo;s information directly from
        children.
      </p>
      <p>
        Agencies sometimes record travel details for children travelling with their families. When they do, the
        agency is responsible for having the parent&rsquo;s or guardian&rsquo;s consent as applicable law requires. A
        parent or guardian may contact the agency, or us, to access or delete a child&rsquo;s information.
      </p>

      <h2 id="changes">14. Changes to this policy</h2>
      <p>
        We may update this policy when TripOS or the law changes. We will post the new version on this page and
        change the &ldquo;Last updated&rdquo; date. If a change is significant, we will also tell agency users by
        email or in TripOS before it takes effect.
      </p>

      <h2 id="contact">15. Contact us</h2>
      <p>For privacy questions, requests or complaints, including grievances:</p>
      <ul>
        <li>Business: {LEGAL.operator}</li>
        <li>Location: {LEGAL.location}</li>
        <li>Email: {mail}</li>
      </ul>
    </LegalPage>
  );
}
