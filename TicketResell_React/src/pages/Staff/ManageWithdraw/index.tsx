import StaffNavBar from "../../../components/StaffNavBar";
import Footer from "../../../components/Footer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ScrollToTop from "../../../components/ScrollToTop";
import useManageWithdraw from "./useManageWithdraw";

const ManageWithdraw = () => {

    const {
        wallets,
        handleUpdate,
        status,
        setStatus,
        withDrawId,
        setWithDrawId,
        handleChange,
    } = useManageWithdraw();

    return (
      <div className="w-screen min-h-screen flex flex-col">
        {/* SCROLL TO TOP */}
        <ScrollToTop />

        {/* NAVBAR */}
        <StaffNavBar />

        {/* SCROLL TO TOP BUTTON */}
        <ScrollToTopButton />

        {/* MAIN CONTENT */}
        <div className="w-full flex-grow mt-24">
          <div className="w-[90%] mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6">Duyệt Rút Tiền</h1>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-[#87CBB9]">
                  <tr>
                    <th className="p-4 border-b border-gray-300 text-left">
                      Ví
                    </th>
                    <th className="p-4 border-b border-gray-300 text-left">
                      Ngân hàng
                    </th>
                    <th className="p-4 border-b border-gray-300 text-left">
                      Tên tài khoản
                    </th>
                    <th className="p-4 border-b border-gray-300 text-left">
                      Số tài khoản
                    </th>
                    <th className="p-4 border-b border-gray-300 text-left">
                      Số tiền
                    </th>
                    <th className="p-4 border-b border-gray-300 text-left">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((wallet) => (
                    <tr key={wallet.walletId} className="hover:bg-gray-100 ">
                      <td className="p-4 border-b border-gray-300">
                        {wallet.walletId}
                      </td>
                      <td className="p-4 border-b border-gray-300">
                        {wallet.bankName}
                      </td>
                      <td className="p-4 border-b border-gray-300">
                        {wallet.bankAccountName}
                      </td>
                      <td className="p-4 border-b border-gray-300">
                        {wallet.bankAccountNumber}
                      </td>
                      <td className="p-4 border-b border-gray-300">
                        {wallet.amount}
                      </td>
                      <td className="p-4 border-b border-gray-300">
                        <select
                          value={wallet.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            handleChange(wallet.withDrawId, newStatus);
                          }}
                          className="w-fit p-2 border border-gray-300 rounded"
                        >
                          <option value="Pending">Chờ duyệt</option>
                          <option value="Complete">Duyệt</option>
                          <option value="Canceled">Từ chối</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <div className="flex-grow-0">
          <Footer />
        </div>
      </div>
    );
}

export default ManageWithdraw;