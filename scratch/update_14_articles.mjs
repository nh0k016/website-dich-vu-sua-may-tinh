import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articlesData = [
  // --- 4 BÀI SỬA MÁY TÍNH ---
  {
    slug: 'sua-may-tinh-thu-duc',
    content: `<h2>Sửa Máy Tính Thủ Đức - Khắc Phục Sự Cố Cho Sinh Viên & Khu Công Nghiệp</h2>
<p>Khu vực TP Thủ Đức (quận Thủ Đức cũ) là nơi tọa lạc của Làng Đại học Quốc gia, các khu Công nghệ cao và KCN Linh Trung. Nhu cầu sử dụng máy tính tần suất cao từ các bạn sinh viên chạy đồ án, cũng như hệ thống máy trạm của kỹ sư luôn đòi hỏi độ ổn định tuyệt đối. Khi hệ thống trục trặc, việc tìm một dịch vụ sửa chữa am hiểu kỹ thuật và có mặt nhanh chóng là điều vô cùng cần thiết.</p>

<h3>Chuyên Trị Lỗi Laptop & PC Workstation</h3>
<p><strong>FastFix</strong> tự hào đồng hành cùng khách hàng tại Thủ Đức với các dịch vụ chuyên sâu:</p>
<ul>
  <li>Cài đặt hệ điều hành, tối ưu hóa phần mềm đồ họa (SolidWorks, Premiere) cho sinh viên và dân thiết kế.</li>
  <li>Khắc phục triệt để lỗi máy tính bật không lên, chập nguồn do nguồn điện khu vực không ổn định.</li>
  <li>Nâng cấp phần cứng (SSD, RAM) chuyên nghiệp, có bảo hành uy tín.</li>
</ul>

<img src="/articles/sua-may-tinh-thu-duc-1.jpg" alt="Sửa chữa máy tính và laptop cho sinh viên tại Thủ Đức" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Chất lượng dịch vụ chuẩn mực</h3>
<p>Chúng tôi tập trung vào <strong>giải pháp bền vững, giá cả hợp lý và báo giá minh bạch</strong> ngay từ đầu. FastFix tuyệt đối không sử dụng linh kiện trôi nổi giá rẻ mạt để cạnh tranh. Bạn hoàn toàn có thể yên tâm giao phó máy tính cho các kỹ thuật viên lành nghề của chúng tôi xử lý ngay tại nhà.</p>`
  },
  {
    slug: 'sua-may-tinh-tan-phu',
    content: `<h2>Sửa Máy Tính Tân Phú - Hỗ Trợ Nhanh Chóng Tận Nhà</h2>
<p>Tân Phú là khu vực có mật độ dân cư sầm uất với các khu đô thị lớn như Celadon City, khu vực Aeon Mall và rất nhiều xưởng sản xuất gia công. Một khi máy tính gia đình hay máy trạm của xưởng gặp trục trặc, công việc bị đình trệ mang lại không ít phiền toái.</p>

<h3>Khắc Phục Nhanh Sự Cố Công Nghệ</h3>
<p>Đội ngũ kỹ thuật <strong>FastFix</strong> luôn túc trực tại khu vực Tân Phú để hỗ trợ bạn kịp thời nhất:</p>
<ul>
  <li>Xử lý sự cố mạng nội bộ, WiFi yếu hoặc rớt mạng liên tục.</li>
  <li>Cứu dữ liệu ổ cứng hỏng, phục hồi file báo cáo quan trọng.</li>
  <li>Sửa chữa laptop bị vô nước, kẹt bàn phím, gãy bản lề tại chỗ.</li>
</ul>

<img src="/articles/sua-may-tinh-tan-phu-1.jpg" alt="Sửa chữa và nâng cấp máy tính tại Tân Phú" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Uy Tín Tạo Nên Thương Hiệu</h3>
<p>Với FastFix, sự hài lòng của bạn là trên hết. Chúng tôi cung cấp dịch vụ <strong>chuyên nghiệp, giá trị xứng đáng với chi phí hợp lý</strong>. Khách hàng tại Tân Phú luôn được kỹ thuật viên kiểm tra kỹ lưỡng, bắt đúng bệnh và chỉ tiến hành sửa chữa khi có sự đồng ý. Không vẽ bệnh, không báo giá mập mờ.</p>`
  },
  {
    slug: 'sua-may-tinh-hoc-mon',
    content: `<h2>Sửa Máy Tính Hóc Môn - Dịch Vụ IT Tận Cửa, Không Ngại Xa</h2>
<p>Việc tìm kiếm một cửa hàng sửa chữa máy tính bài bản, chuyên nghiệp tại khu vực ngoại thành như Hóc Môn đôi khi làm mất nhiều thời gian của bạn. Chưa kể việc ôm bộ máy tính bàn cồng kềnh di chuyển qua những đoạn đường đông đúc tiềm ẩn nhiều rủi ro va đập hỏng hóc nặng hơn.</p>

<h3>FastFix Đồng Hành Cùng Bà Con Hóc Môn</h3>
<p>Hiểu được khó khăn đó, dịch vụ sửa máy tính tận nơi của <strong>FastFix</strong> đã mở rộng phạm vi hỗ trợ đến toàn bộ khu vực Hóc Môn:</p>
<ul>
  <li>Cài Win, phần mềm học tập cho học sinh, sinh viên tại nhà.</li>
  <li>Bảo trì máy tính cho các kho bãi, cơ sở kinh doanh quanh chợ đầu mối.</li>
  <li>Thay thế màn hình laptop, pin, sạc chính hãng với chế độ bảo hành tận tâm.</li>
</ul>

<img src="/articles/sua-may-tinh-hoc-mon-1.jpg" alt="Kỹ thuật viên sửa máy tính tận nhà Hóc Môn" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Minh Bạch & Tận Tâm</h3>
<p>FastFix cam kết mang đến dịch vụ <strong>chuẩn chất lượng trung tâm với chi phí vô cùng hợp lý</strong>, không lợi dụng đường xa để "hét giá" hay thu phụ phí bất hợp lý. Mọi quy trình đều diễn ra ngay trước mắt bạn, đảm bảo sự an tâm tuyệt đối.</p>`
  },
  {
    slug: 'sua-may-tinh-binh-chanh',
    content: `<h2>Sửa Máy Tính Bình Chánh - Nhanh Chóng & Chuyên Nghiệp</h2>
<p>Bình Chánh là cửa ngõ giao thương quan trọng với nhiều cụm công nghiệp và khu dân cư sầm uất (như Bình Hưng, Quốc lộ 50). Khi các thiết bị văn phòng, máy tính điều khiển máy móc tại xưởng gặp sự cố, bạn cần một đội ngũ IT phản ứng nhanh để tránh làm gián đoạn dây chuyền sản xuất hay công việc kinh doanh.</p>

<h3>Sửa Chữa Chuyên Sâu Các Lỗi Khó</h3>
<p>Đội ngũ <strong>FastFix</strong> có nhiều kinh nghiệm xử lý các sự cố phức tạp tại Bình Chánh:</p>
<ul>
  <li>Khắc phục máy tính dính virus mã hóa tống tiền (Ransomware), bảo vệ dữ liệu nội bộ.</li>
  <li>Lắp đặt và cấu hình mạng nội bộ cho kho xưởng, công ty quy mô vừa và nhỏ.</li>
  <li>Xử lý sự cố phần cứng PC, thay mainboard, nguồn công suất thực đảm bảo tính ổn định.</li>
</ul>

<img src="/articles/sua-may-tinh-binh-chanh-1.jpg" alt="Dịch vụ IT sửa chữa máy tính công ty tại Bình Chánh" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Đúng Bệnh - Đúng Giá</h3>
<p>Chúng tôi tập trung vào <strong>giá trị dịch vụ đích thực với mức giá hợp lý và minh bạch</strong>. Tuyệt đối không có tình trạng sử dụng đồ linh kiện kém chất lượng "giá siêu rẻ" để rồi hỏng lại sau vài ngày. Khách hàng Bình Chánh luôn yên tâm khi sử dụng dịch vụ của FastFix.</p>`
  },

  // --- 10 BÀI VỆ SINH MÁY TÍNH ---
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-binh-tan',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Bình Tân - Trả Lại Hiệu Năng Ban Đầu</h2>
<p>Bình Tân nằm ven các trục đường lớn (Quốc lộ 1A, Kinh Dương Vương) nên lượng bụi bẩn trong không khí rất cao. Bụi bám lâu ngày vào khe tản nhiệt và quạt làm mát của laptop, PC sẽ khiến máy hoạt động ồn ào, quá nhiệt và có thể gây cháy chập linh kiện đắt tiền.</p>
<h3>Bảo Dưỡng Chuyên Sâu Tận Nhà</h3>
<p><strong>FastFix</strong> cung cấp dịch vụ vệ sinh máy tính tận nhà tại Bình Tân, giúp bạn dọn sạch lớp bụi bẩn cứng đầu:</p>
<ul>
  <li>Tháo lắp chuyên nghiệp, vệ sinh từng linh kiện (quạt, bo mạch, khe tản nhiệt).</li>
  <li>Thay keo tản nhiệt cao cấp (MX-4, Thermal Grizzly) giúp máy giảm nhiệt độ rõ rệt.</li>
  <li>Tra dầu quạt tản nhiệt, chống rỉ sét cho các cổng kết nối.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-binh-tan-1.jpg" alt="Vệ sinh laptop chuyên nghiệp tại Bình Tân" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Chúng tôi cam kết sử dụng <strong>keo tản nhiệt chất lượng, làm kỹ càng từng góc cạnh với chi phí rất hợp lý</strong>. Khách hàng giám sát trực tiếp, không lo luộc đồ.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-quan-tan-phu',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Tân Phú - Làm Mát Chuyên Nghiệp</h2>
<p>Bạn đang làm việc hoặc chơi game tại Tân Phú thì máy tự nhiên tắt sập? Sờ vào khu vực bàn phím thấy nóng ran? Đó là dấu hiệu cảnh báo máy tính của bạn đã bị khô keo tản nhiệt và tắc nghẽn khe thông gió do bụi bẩn.</p>
<h3>Phục Hồi Hiệu Năng Máy Tính</h3>
<p>Đội ngũ <strong>FastFix</strong> nhận vệ sinh, bảo dưỡng laptop và PC tận nhà khu vực Tân Phú với tiêu chuẩn kỹ thuật khắt khe:</p>
<ul>
  <li>Làm sạch hoàn toàn bụi bẩn bám dính lâu năm trong case PC, laptop.</li>
  <li>Lau sạch lớp keo cũ khô cứng, tra lớp keo tản nhiệt mới chất lượng cao để tản nhiệt tối đa.</li>
  <li>Kiểm tra tổng thể sức khỏe ổ cứng, phần mềm đi kèm miễn phí.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-tan-phu-1.jpg" alt="Bảo dưỡng thay keo tản nhiệt máy tính tại Tân Phú" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Thay vì sử dụng các loại keo kém chất lượng trôi nổi, FastFix luôn <strong>ưu tiên vật tư xịn, báo giá minh bạch, hợp lý</strong> để mang lại sự yên tâm dài lâu cho bạn.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-quan-tan-binh',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Tân Bình - Bảo Trì PC Văn Phòng</h2>
<p>Với đặc thù nhiều tòa nhà văn phòng, máy tính tại Tân Bình thường phải hoạt động liên tục 8-10 tiếng mỗi ngày. Môi trường máy lạnh ít bụi rác nhưng mảng bám mịn lâu ngày lại là tác nhân chính gây cản trở quạt làm mát, khiến máy chạy chậm, giật lag.</p>
<h3>Gói Bảo Dưỡng IT Văn Phòng & Cá Nhân</h3>
<p>Dịch vụ vệ sinh máy tính của <strong>FastFix</strong> hỗ trợ tận nơi làm việc hoặc tận nhà tại Tân Bình:</p>
<ul>
  <li>Vệ sinh tổng thể từ trong ra ngoài: Bàn phím, màn hình, mainboard.</li>
  <li>Thay keo tản nhiệt chuyên dụng cho dòng máy văn phòng và máy trạm (Workstation).</li>
  <li>Giúp hệ thống vận hành êm ái, kéo dài tuổi thọ linh kiện.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-tan-binh-1.jpg" alt="Vệ sinh máy tính văn phòng tận nơi Tân Bình" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Dịch vụ thực hiện <strong>nhanh gọn, chuyên nghiệp, giá cả cực kỳ hợp lý</strong> và có cung cấp hóa đơn chứng từ đầy đủ cho doanh nghiệp.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-go-vap',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Gò Vấp - Chuyên Trị Máy Nóng Giật Lag</h2>
<p>Các bạn sinh viên, dân văn phòng tại Gò Vấp thường xuyên sử dụng laptop để cày game, làm đồ họa cường độ cao. Tình trạng chung là sau 1-2 năm, máy sẽ cực kỳ nóng, quạt gió rú to gây khó chịu và sụt giảm FPS khi chơi game.</p>
<h3>Làm Mát Laptop Gaming & PC Đồ Họa</h3>
<p><strong>FastFix</strong> cung cấp gói vệ sinh chuyên sâu ngay tại nhà Gò Vấp, bạn không cần ra đường kẹt xe:</p>
<ul>
  <li>Tháo dỡ an toàn, lau sạch keo khô cũ trên CPU, GPU.</li>
  <li>Bôi keo tản nhiệt xịn (đạt chuẩn tản nhiệt cao) chuyên dụng cho máy Gaming.</li>
  <li>Xịt bóng, làm sạch toàn bộ khung sườn máy, khe thoát nhiệt.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-go-vap-1.jpg" alt="Vệ sinh laptop gaming tại nhà Gò Vấp" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Chúng tôi luôn <strong>làm cẩn thận, tỉ mỉ với mức phí hoàn toàn xứng đáng</strong>. Một lần vệ sinh định kỳ giúp cứu sống chiếc laptop đắt tiền của bạn.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-quan-11',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Quận 11 - Sạch Bụi Trơn Tru</h2>
<p>Máy tính đặt trong các cửa hàng buôn bán tại Quận 11 rất dễ hút lông động vật, bụi vải, bụi đường. Lâu ngày, lớp "thảm" bụi này sẽ làm bó cứng quạt tản nhiệt, dẫn đến hỏng hóc bo mạch và ổ cứng do nhiệt lượng không thoát ra được.</p>
<h3>Cứu Hộ "Nhiệt Độ" Máy Tính Tại Nhà</h3>
<p>Đừng đợi đến khi máy sập nguồn mới lo đi sửa. Hãy gọi <strong>FastFix</strong> để vệ sinh định kỳ:</p>
<ul>
  <li>Dọn dẹp triệt để bụi bẩn, mạng nhện, lông thú cưng kẹt trong máy.</li>
  <li>Thêm lớp keo tản nhiệt mới, giúp linh kiện giao tiếp nhiệt cực tốt với ống đồng.</li>
  <li>Phục hồi độ nhạy của bàn phím và các nút bấm.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-quan-11-1.jpg" alt="Làm sạch bụi và vệ sinh máy tính Quận 11" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Quy trình vệ sinh <strong>minh bạch, thợ lành nghề làm ngay trước mặt khách, chi phí cực kỳ hợp lý</strong>. Giúp máy tính của shop bạn luôn hoạt động êm ái 24/7.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-quan-10',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Quận 10 - Tản Nhiệt Tối Đa</h2>
<p>Là một "dân chơi" công nghệ tại Quận 10, chắc chắn bạn biết nhiệt độ là kẻ thù số 1 của linh kiện điện tử. Dù máy có xịn đến đâu, nếu không bảo dưỡng, thay keo tản nhiệt định kỳ thì việc giảm hiệu năng, tụt xung nhịp là không thể tránh khỏi.</p>
<h3>Dịch Vụ Vệ Sinh PC & Laptop Chuẩn Mực</h3>
<p>Dịch vụ vệ sinh tại nhà của <strong>FastFix</strong> đáp ứng cả những cỗ máy phức tạp nhất:</p>
<ul>
  <li>Làm sạch tản nhiệt khí, thổi bụi sạch sẽ toàn bộ thùng máy (Case).</li>
  <li>Vệ sinh card đồ họa (VGA) và bôi keo tản nhiệt chất lượng cao.</li>
  <li>Tối ưu hệ thống lưu thông gió (Airflow) cho PC.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-quan-10-1.jpg" alt="Vệ sinh PC và card đồ họa chuyên sâu tại Quận 10" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Chúng tôi không dùng chiêu trò giá cực rẻ để thu hút khách rồi làm ẩu. FastFix lấy <strong>sự cẩn thận, trung thực và giá cả hợp lý</strong> làm tiêu chí phục vụ hàng đầu tại Quận 10.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-hoc-mon',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Hóc Môn - Bảo Vệ Tuổi Thọ Máy</h2>
<p>Nhiều khách hàng ở Hóc Môn thường có thói quen dùng máy tính đến lúc hỏng hẳn mới đem đi sửa vì ngại tìm chỗ vệ sinh xa. Đây là sai lầm khiến bạn mất đi hàng triệu đồng để thay thế linh kiện do cháy chập vì quá nhiệt và bụi ẩm.</p>
<h3>Bảo Dưỡng Máy Tính Tận Cửa</h3>
<p>Chỉ với một cuộc gọi, đội ngũ <strong>FastFix</strong> sẽ có mặt tận nhà tại Hóc Môn để:</p>
<ul>
  <li>Tháo máy làm sạch bụi, mạng nhện rỉ sét trong mainboard.</li>
  <li>Tra lớp keo tản nhiệt chuẩn giúp máy mát hơn từ 10 - 20 độ C.</li>
  <li>Lau sạch màn hình, phím, vệ sinh kỹ càng để trả lại chiếc máy như mới.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-hoc-mon-1.jpg" alt="Vệ sinh máy tính bàn tận nhà Hóc Môn" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Mức giá vệ sinh tại nhà của chúng tôi được niêm yết <strong>minh bạch, hợp lý và tương xứng với chất lượng</strong>. Đội ngũ không ngại đường xa để đem lại sự an tâm cho bạn.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-quan-binh-thanh',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Bình Thạnh - Nhanh Gọn Uy Tín</h2>
<p>Laptop của bạn đang có hiện tượng quạt tản nhiệt kêu to rè rè, máy rất nóng và thường xuyên bị treo ứng dụng khi mở nhiều tab? Đó là lúc bạn cần một chuyên viên IT tại Bình Thạnh giúp máy "thở" lại bình thường.</p>
<h3>Tháo Ráp Vệ Sinh Kỹ Lưỡng Tại Chỗ</h3>
<p><strong>FastFix</strong> cung cấp gói vệ sinh tận các căn hộ chung cư, nhà hẻm khu vực Bình Thạnh:</p>
<ul>
  <li>Hút sạch bụi bám trong khe gió tản nhiệt.</li>
  <li>Sử dụng dung dịch chuyên dụng làm sạch mạch điện tử, không gây chạm chập.</li>
  <li>Thay mới lớp keo tản nhiệt đã khô cứng thành keo MX-4 chính hãng.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-binh-thanh-1.jpg" alt="Bảo dưỡng thay keo laptop tận nơi Bình Thạnh" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>FastFix hiểu khách hàng sợ tình trạng "luộc đồ". Vì vậy chúng tôi thực hiện <strong>ngay trước mắt bạn với mức phí dịch vụ hợp lý, rõ ràng</strong>. Báo giá một lần, không phát sinh linh tinh.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-thu-duc',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Thủ Đức - Máy Mát Chạy Mượt</h2>
<p>Sống tại TP. Thủ Đức, dù là sinh viên hay dân văn phòng, ai cũng cần một chiếc máy tính hoạt động ổn định. Tuy nhiên, sau một thời gian dài cày ải đồ án, game, lớp keo tản nhiệt sẽ mất đi hiệu quả, biến chiếc laptop của bạn thành "lò sưởi".</p>
<h3>Phục Hồi Sức Mạnh Công Nghệ</h3>
<p>Dịch vụ bảo dưỡng định kỳ của <strong>FastFix</strong> giúp bạn:</p>
<ul>
  <li>Làm sạch rác rưởi, bụi bông mắc kẹt trong hệ thống quạt thông gió.</li>
  <li>Bôi keo tản nhiệt cao cấp để CPU, GPU thoát nhiệt nhanh chóng.</li>
  <li>Kiểm tra độ rơ của bản lề, tra dầu quạt gió chống tiếng ồn ốc vít.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-thu-duc-1.jpg" alt="Vệ sinh laptop chuyên nghiệp tại Thủ Đức" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Cam kết <strong>thợ tay nghề cao, tháo ráp cẩn thận, không làm trầy xước máy với mức giá cực kỳ hợp lý</strong>. Gọi là có mặt, làm việc uy tín đặt lên hàng đầu.</p>`
  },
  {
    slug: 've-sinh-may-tinh-laptop-tan-noi-binh-chanh',
    content: `<h2>Vệ Sinh Máy Tính, Laptop Tận Nơi Bình Chánh - Sạch Bụi Tản Nhiệt Tốt</h2>
<p>Môi trường khu vực Bình Chánh đôi khi nhiều bụi công trình, kho bãi. Việc máy tính hút bụi vào trong dẫn đến chạm chập mainboard là điều diễn ra rất thường xuyên. Vệ sinh định kỳ là cách rẻ nhất để bảo vệ khối tài sản công nghệ của bạn.</p>
<h3>Làm Sạch Tại Nhà Nhanh Gọn Chuyên Nghiệp</h3>
<p>Đội ngũ kỹ thuật <strong>FastFix</strong> không quản ngại vị trí, đến tận nơi giúp bạn:</p>
<ul>
  <li>Xịt sạch lớp bụi ẩm, mạng nhện bên trong Case máy tính bàn, Laptop.</li>
  <li>Thay keo tản nhiệt chuẩn hãng, tản nhiệt tốt, không bị khô nhanh.</li>
  <li>Vệ sinh sạch sẽ bàn phím, bề mặt máy tính ngăn ngừa vi khuẩn.</li>
</ul>
<img src="/articles/ve-sinh-may-tinh-binh-chanh-1.jpg" alt="Vệ sinh dọn dẹp máy tính tại xưởng Bình Chánh" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />
<p>Thay vì sử dụng dịch vụ giá bèo làm ẩu gây hỏng máy, hãy chọn FastFix với <strong>dịch vụ chất lượng, giá cả hợp lý và báo giá công khai trước khi làm</strong>. Sự hài lòng của bạn tại Bình Chánh là thước đo thành công của chúng tôi.</p>`
  }
];

async function updateAll() {
  let count = 0;
  for (const item of articlesData) {
    try {
      const article = await prisma.article.findUnique({ where: { slug: item.slug } });
      if (article) {
        await prisma.article.update({
          where: { slug: item.slug },
          data: {
            content: item.content,
            description: item.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
          }
        });
        console.log(`✅ Cập nhật thành công: ${item.slug}`);
        count++;
      } else {
        console.log(`⚠️ Không tìm thấy bài viết: ${item.slug}`);
      }
    } catch (err) {
      console.error(`❌ Lỗi: ${item.slug}`, err.message);
    }
  }
  console.log(`\n🎉 Đã cập nhật thành công ${count}/14 bài viết.`);
}

updateAll()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
