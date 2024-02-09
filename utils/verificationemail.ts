import { createTransport } from "nodemailer"

export async function mySendVerificationRequest(params:any) {
  const { identifier, url, provider } = params
  const { host } = new URL(url)
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server)
  console.log("Sening auth email");
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to DataVids.io`,
    text: text({ url, host }),
    html: html({ url, host }),
  })
  console.log("Email Login response "+JSON.stringify(result));
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function html(params: { url: string; host: string;  }) {
  const { url, host } = params

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor =  "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText:  "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>DataVids.IO</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
    <tr>
    <td>
    <div className="flex">
    <h3>Follow DataVidsIO:</h3>
    <a  rel="nofollow" style="padding-right: 3px;" href="https://twitter.com/DataVidsIO">
        Twitter 
      </a>
      <a rel="nofollow"  style="padding-right: 3px;" href="https://www.instagram.com/datavidsio/">
        Instagram
      </a>
      <a rel="nofollow" style="padding-right: 3px;" href="https://www.tiktok.com/@datavidsio">
        Tik Tok
      </a>
       </div>
    </td>
    </tr>
  </table>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}