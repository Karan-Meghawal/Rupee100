import Setting from "../services/Setting";
import User from "../services/User";

const RegistrationSuccessful = async (userId: number) => {
  const user = await User.getInstance(userId);
  const { userName, email, createdAt, referralId, placementId, placementSide } =
    user.row;
  const displayName = user.getDisplayName();
  const setting = await Setting.getInstance();
  const { appName } = setting.row;

  return ` <p style="font-size:36px;line-height:42px;margin:30px 0;color:#1d1c1d;font-weight:700;padding:0">Registration Successful</p>
              <p style="font-size:20px;line-height:28px;margin:16px 0;margin-bottom:30px">Hey ${displayName}, Your account has been created successfully! Here is your registration details.</p>
              <table style="width:100%;background:rgb(245, 244, 245);border-radius:4px;margin-right:50px;margin-bottom:30px;padding:43px 23px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                  <tr style="display:grid;grid-auto-columns:minmax(0, 1fr);grid-auto-flow:column">
                    <td>
                  <tr>
                    <td>
                      <p style="font-size:18px;margin:16px 0;color:#637381">User Id</p>
                    </td>
                    <td>
                      <p style="font-size:18px;margin:16px 0;color:#637381">${userId}</p>
                    </td>
                  </tr>
          </td>
          <td>
        <tr>
          <td>
            <p style="font-size:18px;margin:16px 0;color:#637381">Username</p>
          </td>
          <td>
            <p style="font-size:18px;margin:16px 0;color:#637381">${userName}</p>
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
              <p style="font-size:18px;margin:16px 0;color:#637381">Referral Id</p>
            </td>
            <td>
              <p style="font-size:18px;margin:16px 0;color:#637381">${
                referralId ?? "-"
              }</p>
            </td>
          </tr>
        </td>
        <td>
          <tr>
            <td>
              <p style="font-size:18px;margin:16px 0;color:#637381">Placement Id</p>
            </td>
            <td>
              <p style="font-size:18px;margin:16px 0;color:#637381">${
                placementId ?? "-"
              }</p>
            </td>
          </tr>
        </td>
        <td>
          <tr>
            <td>
              <p style="font-size:18px;margin:16px 0;color:#637381">Placement Side</p>
            </td>
            <td>
              <p style="font-size:18px;margin:16px 0;color:#637381">${placementSide}</p>
            </td>
          </tr>
        </td>
        <td>
          <tr>
            <td>
              <p style="font-size:18px;margin:16px 0;color:#637381">Registration Date</p>
            </td>
            <td>
              <p style="font-size:18px;margin:16px 0;color:#637381">${createdAt.toISOString()}</p>
            </td>
          </tr>
        </td>
        </tr>
      </tbody>
    </table>
    <table style="width:100%" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    <tbody>
      <tr style="display:grid;grid-auto-columns:minmax(0, 1fr);grid-auto-flow:column">
        <td>
          <p style="font-size:15px;line-height:24px;margin:16px 0;color:#333">Thanks for becoming a member of ${appName}</p>
        </td>
      </tr>
    </tbody>
  </table>`;
};

export default RegistrationSuccessful;
