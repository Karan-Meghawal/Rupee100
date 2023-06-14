const LoginVerification = (
  otp: number,
) => ` <p style="font-size:36px;line-height:42px;margin:30px 0;color:#1d1c1d;font-weight:700;padding:0">Login Verification</p>
<p style="font-size:20px;line-height:28px;margin:16px 0;margin-bottom:30px">Your otp verification code is:</p>
<table style="width:100%;background:rgb(245, 244, 245);border-radius:4px;margin-right:50px;margin-bottom:30px;padding:43px 23px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation">
  <tbody>
    <tr style="display:grid;grid-auto-columns:minmax(0, 1fr);grid-auto-flow:column">
      <td>
        <p style="font-size:30px;line-height:24px;margin:16px 0;vertical-align:middle;text-align:center">${otp}</p>
      </td>
    </tr>
  </tbody>
</table>
<p style="font-size:15px;line-height:24px;margin:16px 0;color:#333">Please make sure you never share this code with anyone.</p>
<p style="font-size:15px;line-height:24px;margin:16px 0;color:#333">Note: This code will expire in 15 minutes</p>`;
export default LoginVerification;
