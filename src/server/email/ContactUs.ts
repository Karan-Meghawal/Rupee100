import { type HomeSchema } from "../main/schema";

const ContactUs = ({
  email,
  firstName,
  lastName,
  phone,
  message,
}: HomeSchema["contactUs"]) => `<p style="font-size:36px;line-height:42px;margin:30px 0;color:#1d1c1d;font-weight:700;padding:0">Contact Us</p>
<table
  style="width:100%;background:rgb(245, 244, 245);border-radius:4px;margin-right:50px;margin-bottom:30px;padding:43px 23px"
  align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation">
  <tbody>
    <tr style="display:grid;grid-auto-columns:minmax(0, 1fr);grid-auto-flow:column">
      <td>
    <tr>
      <td>
        <p style="font-size:18px;margin:16px 0;color:#637381">First Name</p>
      </td>
      <td>
        <p style="font-size:18px;margin:16px 0;color:#637381">${firstName}</p>
      </td>
    </tr>
    </td>
    <td>
      <tr>
        <td>
          <p style="font-size:18px;margin:16px 0;color:#637381">Last Name</p>
        </td>
        <td>
          <p style="font-size:18px;margin:16px 0;color:#637381">${lastName}</p>
        </td>
      </tr>
    </td>
    <td>
      <tr>
        <td>
          <p style="font-size:18px;margin:16px 0;color:#637381">Email</p>
        </td>
        <td>
          <p style="font-size:18px;margin:16px 0;color:#637381">${email}</p>
        </td>
      </tr>
    </td>
    <td>
      <tr>
        <td>
          <p style="font-size:18px;margin:16px 0;color:#637381">Phone</p>
        </td>
        <td>
          <p style="font-size:18px;margin:16px 0;color:#637381">${phone}</p>
        </td>
      </tr>
    </td>
    <td>
      <tr>
        <td>
          <p style="font-size:18px;margin:16px 0;color:#637381">Message</p>
        </td>
        <td>
          <p style="font-size:18px;margin:16px 0;color:#637381">${message}</p>
        </td>
      </tr>
    </td>
    </tr>
  </tbody>
</table>`;
export default ContactUs;
