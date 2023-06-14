import Setting from "../services/Setting";

const RegistrationVerification = async (otp: number) => {
  const setting = await Setting.getInstance();
  const { appName } = setting.row;

  return `<p style="font-size:36px;line-height:42px;margin:30px 0;color:#1d1c1d;font-weight:700;padding:0">Registration Verification</p>
    <p style="font-size:20px;line-height:28px;margin:16px 0;margin-bottom:30px">Hey, Just verify your email address to get started with ${appName}. Your otp verification is:</p>
    <table style="width:100%;background:rgb(245, 244, 245);border-radius:4px;margin-right:50px;margin-bottom:30px;padding:43px 23px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation">
      <tbody>
        <tr style="display:grid;grid-auto-columns:minmax(0, 1fr);grid-auto-flow:column">
          <td>
            <p style="font-size:30px;line-height:24px;margin:16px 0;vertical-align:middle;text-align:center">${otp}</p>
          </td>
        </tr>
      </tbody>
    </table>`;
};

export default RegistrationVerification;
