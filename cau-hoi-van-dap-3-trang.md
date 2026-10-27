# Câu hỏi vấn đáp thường gặp: Gợi ý AI, Giao dịch, Ngân sách

Mỗi câu có đáp án ngắn dựa trên mã nguồn trong `thanh-vien-1/nguoi-dung/`.

## A. Câu hỏi tổng quan dự án

1. **Dự án dùng công nghệ gì? Có backend/database không?**
   HTML, CSS, JavaScript thuần, không framework, không backend. Dữ liệu lưu bằng `localStorage` của trình duyệt.
2. **Dữ liệu lưu ở đâu, mất khi nào?**
   `localStorage` theo từng trình duyệt và từng máy. Mất khi xóa dữ liệu duyệt web. Không chia sẻ giữa các máy.
3. **`localStorage` khác `sessionStorage` và cookie thế nào?**
   `localStorage` tồn tại lâu dài, không tự gửi lên server, dung lượng khoảng 5 MB. `sessionStorage` mất khi đóng tab. Cookie nhỏ hơn và được gửi kèm mỗi request.
4. **Vì sao dùng `JSON.stringify` và `JSON.parse`?**
   `localStorage` chỉ lưu chuỗi, nên phải chuyển mảng/đối tượng thành chuỗi khi ghi và ngược lại khi đọc.
5. **Dự án có những vai trò nào? Phần của bạn là vai trò nào?**
   Người dùng, Huấn luyện viên, Kiểm duyệt viên, Quản trị viên. Thành viên 1 làm vai trò Người dùng.
6. **Các trang chia sẻ dữ liệu với nhau bằng cách nào?**
   Qua cùng khóa `localStorage` và sự kiện (`spendwise:user-data`, `spendwise:data`, `storage`).
7. **Có bảo mật thật không (đăng nhập, phân quyền)?**
   Không. Đây là bản demo frontend, kiểm tra phía client nên có thể bị bỏ qua. Thực tế cần backend xác thực.

## B. Câu hỏi về HTML

8. **`section`, `article`, `span`, `strong`, `label`, `div` khác nhau thế nào?**
   `section` là phần có chủ đề. `article` là đơn vị độc lập (thẻ thống kê, thẻ ngân sách). `span` là inline không ngữ nghĩa. `strong` nhấn mạnh quan trọng. `label` là nhãn gắn với ô nhập. `div` là khối không ngữ nghĩa.
9. **`<label>` để làm gì?**
   Bấm vào chữ thì focus ô nhập, hỗ trợ trình đọc màn hình, gom nhóm để tạo kiểu.
10. **`visually-hidden` để làm gì? Khác `display:none` ở đâu?**
    Ẩn với mắt nhưng trình đọc màn hình vẫn đọc. `display:none` ẩn cả với trình đọc.
11. **Thuộc tính `data-*` (ví dụ `data-tx-rows`) dùng để làm gì?**
    Làm "móc" để JS tìm phần tử (`querySelector`), tách khỏi class dùng cho CSS.
12. **`<input type="hidden" name="id">` có tác dụng gì?**
    Giữ `id` bản ghi đang sửa. Rỗng thì là thêm mới, có giá trị thì là sửa.
13. **Các thuộc tính `required`, `min`, `step`, `maxlength` làm gì?**
    Kiểm tra cơ bản của trình duyệt: bắt buộc, giá trị nhỏ nhất, bước nhảy, độ dài tối đa.
14. **`aria-label`, `aria-live`, `role="dialog"`, `aria-modal` để làm gì?**
    Hỗ trợ truy cập. `aria-live` làm trình đọc đọc toast khi xuất hiện, `role="dialog"` báo đây là hộp thoại.
15. **Vì sao dùng `<script defer>`?**
    Tải script song song và chạy sau khi HTML phân tích xong, nên truy cập DOM an toàn.
16. **`<script type="application/json" data-category-options>` là gì?**
    Nhúng dữ liệu JSON (danh mục và icon) vào HTML; trình duyệt không thực thi, JS đọc bằng `textContent`.
17. **Thuộc tính `hidden` hoạt động ra sao?**
    Ẩn phần tử. JS bật/tắt bằng `element.hidden = true/false` (modal, trạng thái rỗng).

## C. Câu hỏi về CSS

18. **Class `is-active`, `is-warning`, `is-over-limit` là gì?**
    Class trạng thái do JS gắn vào để đổi màu (đang chọn, ≥80%, ≥100%).
19. **Cách bố cục lưới thẻ thống kê (`stats-grid`, `sum-grid`)?**
    Dùng CSS Grid hoặc Flex. Xem tệp CSS của từng trang để đọc chính xác.
20. **Modal được hiện/ẩn thế nào? `modal-open` để làm gì?**
    Bỏ/đặt `hidden` trên `modal-backdrop`; class `modal-open` trên `body` chặn cuộn nền.
21. **Giao diện tối (dark mode) hoạt động ra sao?**
    Có `darkmode.css` dùng chung ở thư mục gốc. Cần mở file để trả lời cụ thể.
22. **Responsive thực hiện bằng gì?**
    Thường bằng `@media`. Cần chỉ ra đoạn trong CSS của trang bạn.

## D. Câu hỏi về JavaScript chung

23. **`(() => { ... })();` là gì? Vì sao dùng?**
    IIFE: chạy ngay và tạo phạm vi riêng, tránh biến toàn cục rò rỉ.
24. **`"use strict"` là gì?**
    Chế độ nghiêm ngặt, bắt lỗi như dùng biến chưa khai báo.
25. **Toán tử `?.` và `??` nghĩa là gì? (Tác giả dùng `item?.id || ""`)**
    `?.` truy cập an toàn khi null/undefined. `??` lấy vế phải khi vế trái là null/undefined.
26. **`Object.fromEntries(new FormData(form).entries())` làm gì?**
    Chuyển các trường form thành đối tượng `{name: value}`.
27. **`map`, `filter`, `reduce`, `find`, `some`, `sort` dùng ở đâu?**
    `filter` lọc giao dịch; `reduce` tính tổng; `find` tìm theo `id`; `some` kiểm tra trùng ngân sách; `sort` sắp xếp theo ngày; `map` dựng HTML và cập nhật bản ghi.
28. **Spread `[record, ...previous]` làm gì?**
    Tạo mảng mới với bản ghi mới ở đầu, không sửa mảng cũ.
29. **Event delegation là gì? Ở đâu dùng?**
    Gắn một listener ở phần tử cha (`rows`, `[data-bud-list]`) rồi dùng `event.target.closest(...)` để biết nút nào được bấm. Vì dòng được vẽ lại bằng `innerHTML` nên nút mới vẫn hoạt động.
30. **Vì sao cần `escape()` / `escapeHtml()`?**
    Chống XSS: tên giao dịch như `<script>` sẽ bị biến thành văn bản thay vì chạy mã.
31. **`innerHTML` có rủi ro gì?**
    Nếu chèn dữ liệu người dùng chưa escape thì bị XSS. Dự án escape mọi giá trị.
32. **`try/catch` dùng để làm gì trong `load`/`save`?**
    Bắt lỗi JSON hỏng hoặc `localStorage` đầy/bị chặn, rồi báo toast thay vì làm sập trang.
33. **Cơ chế rollback là gì?**
    Giữ `previous` trước khi sửa; nếu `save` lỗi thì gán lại `previous` để giao diện và dữ liệu không lệch.
34. **`CustomEvent` và `dispatchEvent` để làm gì?**
    Phát sự kiện `spendwise:user-data` sau khi lưu để các thành phần khác tự vẽ lại.
35. **Sự kiện `storage` khác sự kiện tự tạo thế nào?**
    `storage` chỉ bắn ở **tab khác** khi `localStorage` đổi, còn sự kiện tự tạo bắn trong cùng tab.
36. **`crypto.randomUUID()` dùng để làm gì? Nếu không có thì sao?**
    Tạo id duy nhất. Nếu trình duyệt không hỗ trợ thì dùng `Date.now()` + số ngẫu nhiên.
37. **`Intl.NumberFormat("vi-VN", {style:"currency", currency:"VND"})` làm gì?**
    Định dạng tiền Việt (`1.500.000 ₫`).
38. **`toLocaleLowerCase("vi")` và `localeCompare(..., "vi")` dùng để làm gì?**
    Tìm kiếm không phân biệt hoa thường và sắp xếp đúng thứ tự tiếng Việt.
39. **Vì sao dùng `T12:00:00` khi tạo `new Date("2026-10-27T12:00:00")`?**
    Tránh lệch múi giờ làm ngày bị lùi/tiến một ngày.
40. **Blob và `URL.createObjectURL` trong xuất CSV?**
    Tạo file trong bộ nhớ, sinh URL tạm, gắn vào thẻ `<a download>` rồi bấm; sau đó `revokeObjectURL` để giải phóng.
41. **`\uFEFF` ở đầu CSV là gì?**
    BOM UTF-8, giúp Excel hiển thị đúng tiếng Việt.
42. **Vì sao thay `"` thành `""` khi xuất CSV?**
    Quy tắc escape của CSV để dấu nháy trong dữ liệu không phá cấu trúc cột.

## E. Trang Giao dịch (`transactions.js`)

43. **Cấu trúc một bản ghi giao dịch?**
    `{id, type, title, amount, category, date, method, note}`, `type` là `income` hoặc `expense`.
44. **Luồng thêm giao dịch từ lúc bấm nút đến khi hiển thị?**
    Mở modal → điền form → submit → kiểm tra (số tiền > 0, ngày không ở tương lai) → tạo bản ghi → `save` → đóng modal → `render` → toast.
45. **Vì sao chọn Khoản thu/Khoản chi lại đổi danh sách danh mục?**
    Sự kiện `change` của radio gọi `fillFormCategories(type)` để nạp danh mục thu hoặc chi.
46. **Danh mục lấy từ đâu? Admin đổi thì sao?**
    Lúc đầu từ JSON nhúng trong HTML; sau đó `refreshCategories()` đọc `spendwise.categories` và chỉ dùng mục "Hoạt động".
47. **`render()` làm những bước nào?**
    Đọc lại dữ liệu → dựng bộ lọc → lọc → sắp xếp theo ngày giảm dần → vẽ bảng → cập nhật chỉ số tháng.
48. **Các thẻ thống kê có thay đổi theo bộ lọc không?**
    Không. Luôn tính theo tháng hiện tại; chỉ bảng chịu ảnh hưởng của bộ lọc.
49. **Vì sao bộ lọc danh mục/tháng được dựng lại mỗi lần `render`?**
    Để phản ánh dữ liệu mới nhất, đồng thời giữ lại lựa chọn hiện tại nếu còn tồn tại.
50. **Cách phân biệt sửa và thêm?**
    Dựa vào trường `id` ẩn: có `id` thì thay thế bản ghi cùng `id`, không có thì chèn bản ghi mới ở đầu mảng.
51. **Tham số `?new` trên URL làm gì?**
    `URLSearchParams(location.search).has("new")` thì mở sẵn form thêm giao dịch (dùng từ nút ở Tổng quan).
52. **Xuất CSV có theo bộ lọc không?**
    Không, xuất toàn bộ giao dịch.
53. **Hàm `totals`, `currentTransactions`, `expensesByCategory` làm gì?**
    Tổng thu/chi; lọc theo tháng (`date.startsWith("YYYY-MM")`); tổng chi theo danh mục.
54. **Vì sao `currentTransactions` dùng `startsWith`?**
    Ngày lưu dạng `YYYY-MM-DD` nên tiền tố `YYYY-MM` đúng là tháng đó.
55. **Điều gì xảy ra nếu `localStorage` chứa dữ liệu hỏng?**
    `load` ném lỗi; `render` bắt lỗi và hiện toast, trang không sập.
56. **Có những lỗi/hạn chế nào?** (câu mở)
    Không lọc CSV; mã tiện ích lặp ở hai file; chưa phân trang; dữ liệu không đồng bộ giữa máy.

## F. Trang Ngân sách (`budget.js`)

57. **Cấu trúc bản ghi ngân sách?**
    `{id, category, limit, month}` với `month` dạng `YYYY-MM`.
58. **Số "Đã chi" lấy từ đâu?**
    Tính tự động từ giao dịch loại `expense` trong tháng bằng `expensesByCategory`, không nhập tay.
59. **Công thức tính tổng hạn mức, còn lại, phần trăm?**
    `totalLimit = Σ limit`, `remaining = totalLimit − totalSpent`, `percent = totalSpent / totalLimit × 100` (0 nếu chưa có hạn mức).
60. **Vì sao `totalSpent` có thể lớn hơn tổng chi của các danh mục có ngân sách?**
    Vì cộng cả danh mục chưa đặt hạn mức.
61. **Ngưỡng cảnh báo là bao nhiêu?**
    ≥80% màu cảnh báo (`is-warning`), ≥100% vượt hạn mức (`is-over-limit`).
62. **Làm sao chặn tạo trùng ngân sách?**
    Dùng `budgets.some(...)` kiểm tra cùng `month` và `category` nhưng khác `id`.
63. **Bộ chọn tháng liệt kê những tháng nào?**
    Tháng hiện tại, các tháng đã có ngân sách và ±5 tháng quanh hôm nay.
64. **Nút tháng trước/sau hoạt động ra sao?**
    Tạo `Date` từ tháng đang chọn, cộng/trừ 1 tháng, rồi `monthKey` và `render`.
65. **Vì sao thêm giao dịch mà ngân sách tự cập nhật?**
    `save("transactions")` phát sự kiện `spendwise:user-data`; trang ngân sách lắng nghe và gọi `render`. Tab khác thì dùng sự kiện `storage`.
66. **Sau khi lưu ngân sách, vì sao tháng đang xem đổi?**
    `selectedMonth = record.month` để người dùng thấy ngay ngân sách vừa tạo.
67. **Tại sao `progress()` dùng `Math.min/Math.max`?**
    Giữ chiều rộng thanh trong khoảng 0–100% để không tràn khi vượt hạn mức.
68. **Chia cho 0 được xử lý thế nào?**
    `totalLimit ? ... : 0` và `Number(budget.limit) ? ... : 0`.

## G. Trang Gợi ý AI (`ai.js` + `workspace-engine.js`)

69. **Trang AI có dùng AI thật không?**
    Không. Là bản demo quản lý vòng đời đề xuất; bản ghi do người dùng nhập, chưa có mô hình sinh đề xuất.
70. **Vì sao `ai.js` chỉ có vài dòng?**
    Dùng engine dùng chung `SpendWiseWorkspace.mount(config)`; engine lo hiển thị, lọc, form, lưu, xuất.
71. **Engine biết cột và trường form từ đâu?**
    Tự suy ra từ HTML: `th[data-key]` thành cột, các input có `name` trong form thành trường.
72. **`data-static-workspace` có tác dụng gì?**
    Báo engine không tự dựng giao diện mà dùng HTML có sẵn.
73. **`storeKey`, `labelKey`, `defaultRecord`, `slug` nghĩa là gì?**
    Khóa lưu trữ; trường hiển thị khi xác nhận xóa; giá trị mặc định cho bản ghi mới; tiền tố tên file CSV.
74. **Các trạng thái đề xuất và ý nghĩa?**
    Chờ xem xét, Đã chấp nhận, Đã chỉnh sửa, Đã từ chối, Đã tạo lại.
75. **Thống kê 4 thẻ tính thế nào?**
    `data-stat="total"` đếm tất cả; `data-stat="status"` đếm theo `data-status`.
76. **Tìm kiếm tìm trong những trường nào?**
    Mọi giá trị của bản ghi, nối thành một chuỗi rồi so khớp.
77. **Badge màu của trạng thái xác định ra sao?**
    Dùng biểu thức chính quy trên chữ của trạng thái (từ chối → đỏ, chờ → vàng).
78. **Dữ liệu `recommendations` ai khác dùng?**
    Trang kiểm duyệt của Thành viên 3, đồng bộ qua `spendwise:data`.

## H. Câu hỏi thiết kế, phản biện

79. **Vì sao tách giao dịch và ngân sách thành hai khóa lưu?**
    Hai thực thể khác nhau; ngân sách chỉ lưu hạn mức còn số chi suy ra từ giao dịch, tránh dữ liệu trùng lặp và lệch.
80. **Vì sao lưu số tiền kiểu số (`Number`) chứ không phải chuỗi?**
    Để cộng trừ và so sánh đúng.
81. **Nếu có hàng nghìn giao dịch thì sao?**
    Mỗi lần `render` quét toàn bộ mảng; cần phân trang, ảo hóa danh sách và backend.
82. **Hai tab cùng sửa dữ liệu thì sao?**
    Dữ liệu cuối cùng ghi sẽ thắng; chưa có cơ chế xử lý xung đột.
83. **Nếu có backend, bạn sửa chỗ nào?**
    Thay `load`/`save` bằng `fetch` tới API; tạo id ở server; xác thực và phân quyền; kiểm tra lại dữ liệu ở server.
84. **Vì sao ghi nhật ký kiểm toán?**
    Để Quản trị viên theo dõi thay đổi; lỗi ghi nhật ký không được làm hỏng việc lưu chính.
85. **Bạn đã kiểm thử bằng cách nào?**
    Chuẩn bị sẵn: thử ca bình thường, số tiền 0 hoặc âm, ngày tương lai, ngân sách trùng, xóa dữ liệu `localStorage`, nhập tên chứa `<script>`.
86. **Bạn đóng góp phần nào trong nhóm?**
    Chuẩn bị câu trả lời: 3 trang (AI, Giao dịch, Ngân sách) và các trang liên quan của Thành viên 1.

## I. Câu hỏi "chỉ vào code"

Thầy có thể bảo bạn mở file và giải thích một đoạn. Hãy luyện đọc các đoạn sau:
- `save()` trong `transactions.js`: ghi dữ liệu, phát sự kiện, ghi nhật ký.
- `render()` trong `budget.js`: các công thức tính và đoạn dựng thẻ ngân sách.
- Trình xử lý `submit` của form giao dịch: kiểm tra, rollback.
- `refreshCategories()`: đồng bộ danh mục từ Quản trị viên.
- `mount()` trong `workspace-engine.js`: cách suy ra cấu hình từ HTML.

## Mẹo trả lời

- Trả lời theo dòng chảy: **người dùng làm gì → JS xử lý gì → dữ liệu lưu ở đâu → giao diện cập nhật ra sao**.
- Nếu không biết, nói rõ "em chưa chắc, theo mã nguồn thì…" rồi chỉ vào đoạn code thay vì đoán.
- Thừa nhận hạn chế của bản demo (không backend, AI chưa thật) trước khi bị hỏi.
