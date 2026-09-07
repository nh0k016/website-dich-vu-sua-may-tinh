import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articlesData = [
  {
    slug: 'sua-may-tinh-go-vap',
    content: `<h2>Sửa Máy Tính Gò Vấp - Có Mặt Nhanh Chóng Tại Nhà</h2>
<p>Khu vực Gò Vấp nổi tiếng với mật độ dân cư đông đúc, đặc biệt là quanh trục đường Quang Trung, Nguyễn Thái Sơn hay Phan Văn Trị. Bạn là sinh viên trường Đại học Công Nghiệp (IUH) đang chạy đồ án, hay dân văn phòng làm việc online tại nhà nhưng máy tính bất ngờ dở chứng? Đừng lo lắng việc phải ôm bộ PC cồng kềnh hay chiếc laptop ra đường giữa lúc kẹt xe.</p>

<h3>Khắc phục sự cố máy tính tận nơi tại Gò Vấp</h3>
<p>Hiểu được sự bất tiện khi di chuyển tại Gò Vấp, <strong>FastFix</strong> mang đến dịch vụ kỹ thuật viên tận nhà. Chúng tôi chuyên xử lý:</p>
<ul>
  <li>Cài đặt lại Windows (Win 10, Win 11), phần mềm đồ họa (AutoCAD, Photoshop) cho sinh viên và người đi làm.</li>
  <li>Xử lý triệt để lỗi máy tính hay bị treo, màn hình xanh chết chóc (Blue Screen).</li>
  <li>Thay thế linh kiện chính hãng (SSD, RAM, Pin, Phím) ngay tại chỗ.</li>
</ul>

<img src="/articles/sua-may-tinh-go-vap-1.jpg" alt="Kỹ thuật viên FastFix sửa máy tính tại nhà Gò Vấp" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Báo giá minh bạch - Dịch vụ chất lượng cao</h3>
<p>Tại FastFix, chúng tôi <strong>không cạnh tranh bằng dịch vụ giá rẻ kém chất lượng</strong>. Mục tiêu của chúng tôi là cung cấp trải nghiệm <strong>uy tín, giá cả hợp lý và xứng đáng với từng đồng</strong> bạn bỏ ra. Mọi chi phí đều được kỹ thuật viên báo trước rõ ràng, bạn đồng ý mới tiến hành làm.</p>
<p>Nếu bạn đang ở Gò Vấp và cần hỗ trợ ngay, hãy truy cập về <a href="/">Trang chủ FastFix</a> hoặc gọi thẳng Hotline để điều phối thợ gần nhất!</p>`
  },
  {
    slug: 'sua-may-tinh-tan-binh',
    content: `<h2>Sửa Máy Tính Tân Bình - Chuyên Nghiệp Cho Doanh Nghiệp & Văn Phòng</h2>
<p>Quận Tân Bình là nơi tập trung rất nhiều tòa nhà văn phòng, khu công sở (khu ETown, Cộng Hòa, Trường Sơn). Đối với các doanh nghiệp và dân văn phòng, thời gian là vàng bạc. Một hệ thống máy tính trục trặc, mạng LAN nội bộ rớt kết nối hay máy in không hoạt động có thể làm đình trệ toàn bộ quy trình làm việc.</p>

<h3>Giải Pháp IT Toàn Diện Tại Tân Bình</h3>
<p>Dịch vụ sửa máy tính tận nơi của <strong>FastFix</strong> được thiết kế để giải quyết dứt điểm các sự cố văn phòng một cách chuyên nghiệp nhất:</p>
<ul>
  <li>Khắc phục lỗi mạng LAN, WiFi nội bộ chập chờn, chia sẻ dữ liệu nội bộ không được.</li>
  <li>Cài đặt và sửa lỗi máy in, máy scan, cấu hình mạng cho thiết bị văn phòng.</li>
  <li>Cứu dữ liệu ổ cứng, phục hồi dữ liệu kế toán quan trọng do virus hoặc xóa nhầm.</li>
  <li>Sửa chữa phần cứng laptop, PC, nâng cấp máy tính đồng bộ công ty.</li>
</ul>

<img src="/articles/sua-may-tinh-tan-binh-1.jpg" alt="Dịch vụ IT văn phòng và sửa máy tính tại Tân Bình" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Chất lượng tương xứng với chi phí</h3>
<p>Chúng tôi hiểu rằng doanh nghiệp cần sự ổn định và bảo mật dữ liệu tuyệt đối. Vì vậy, FastFix cung cấp dịch vụ với mức <strong>giá cả hợp lý, minh bạch và cam kết chất lượng lâu dài</strong> (có xuất hóa đơn VAT đầy đủ). Chúng tôi nói không với các linh kiện trôi nổi, giá rẻ. Chọn FastFix là bạn đang chọn sự yên tâm cho hệ thống IT của mình.</p>`
  },
  {
    slug: 'sua-may-tinh-quan-binh-thanh',
    content: `<h2>Sửa Máy Tính Quận Bình Thạnh - Phục Vụ Tận Cửa Chung Cư</h2>
<p>Bình Thạnh là cửa ngõ trung tâm sầm uất với hàng loạt chung cư cao cấp như Vinhomes Central Park, Saigon Pearl hay các khu dân cư lâu đời như Thanh Đa. Dù bạn ở chung cư tầng cao hay trong hẻm sâu Nơ Trang Long, khi máy tính gặp sự cố, việc tìm kiếm một đơn vị sửa chữa uy tín đến tận nơi luôn là ưu tiên hàng đầu.</p>

<h3>Chuyên Trị Các Dòng Laptop & PC Cao Cấp</h3>
<p>Đội ngũ của <strong>FastFix</strong> đặc biệt am hiểu các dòng máy tính hiện đại, phục vụ hoàn hảo cho cư dân Bình Thạnh:</p>
<ul>
  <li>Xử lý sự cố MacBook, iMac (cài macOS, cài Windows qua BootCamp, vệ sinh định kỳ).</li>
  <li>Sửa chữa laptop Gaming, PC dựng phim/Render bị quá nhiệt, tự tắt nguồn.</li>
  <li>Cài đặt hệ thống mạng WiFi Mesh xuyên tường cho chung cư diện tích lớn.</li>
</ul>

<img src="/articles/sua-may-tinh-binh-thanh-1.jpg" alt="Sửa chữa MacBook và Laptop cao cấp tại Bình Thạnh" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Cam kết uy tín - Không vẽ bệnh</h3>
<p>Thị trường hiện nay có nhiều nơi làm ăn chộp giật báo giá rẻ để thu hút rồi "vẽ" thêm bệnh. FastFix đi theo định hướng khác biệt: <strong>Quy trình chuẩn, bắt đúng bệnh, báo giá hợp lý và cực kỳ trung thực</strong>. Khách hàng trực tiếp giám sát quá trình thao tác của kỹ thuật viên. Đừng ngần ngại liên hệ với chúng tôi qua <a href="/">Trang chủ</a> để trải nghiệm dịch vụ sửa máy tính tận tâm nhất tại Bình Thạnh.</p>`
  },
  {
    slug: 'sua-may-tinh-quan-phu-nhuan',
    content: `<h2>Sửa Máy Tính Quận Phú Nhuận - Dịch Vụ IT Chuẩn Mực</h2>
<p>Phú Nhuận là khu vực trung tâm với dân trí cao, nhiều con đường ẩm thực và cafe sầm uất như Phan Xích Long. Với nhịp sống văn minh, yêu cầu của khách hàng tại đây đối với các dịch vụ sửa chữa tại nhà luôn khắt khe về mặt thái độ phục vụ, tính chuyên nghiệp và độ bảo mật cá nhân.</p>

<h3>Bảo Dưỡng & Sửa Chữa Tận Tâm</h3>
<p><strong>FastFix</strong> tự hào đáp ứng được những tiêu chuẩn khắt khe nhất của khách hàng tại quận Phú Nhuận:</p>
<ul>
  <li>Vệ sinh laptop, PC chuyên sâu, sử dụng keo tản nhiệt cao cấp (Thermal Grizzly, MX-4) giúp máy mát lạnh.</li>
  <li>Nâng cấp ổ cứng SSD, RAM tăng tốc máy tính cũ chạy mượt như mới.</li>
  <li>Sửa bản lề laptop, thay màn hình, bàn phím tại chỗ chỉ trong 30 phút.</li>
  <li>Diệt virus, bảo vệ dữ liệu cá nhân an toàn tuyệt đối.</li>
</ul>

<img src="/articles/sua-may-tinh-phu-nhuan-1.jpg" alt="Vệ sinh và bảo dưỡng máy tính tại quận Phú Nhuận" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Đúng Giá - Trách Nhiệm Chuyên Môn</h3>
<p>Quan điểm của FastFix là mang lại giá trị thực. Chúng tôi <strong>đề cao chất lượng linh kiện và tay nghề kỹ thuật viên với mức chi phí hợp lý</strong>, tuyệt đối không dùng hàng "lô" giá siêu rẻ để giảm chất lượng. Khách hàng tại Phú Nhuận luôn đánh giá cao sự sạch sẽ, gọn gàng và lịch sự của kỹ thuật viên FastFix sau khi hoàn tất công việc.</p>`
  },
  {
    slug: 'sua-may-tinh-quan-10',
    content: `<h2>Sửa Máy Tính Quận 10 - An Tâm Tuyệt Đối Tận Nhà</h2>
<p>Nhắc tới Quận 10, người ta nghĩ ngay đến thủ phủ linh kiện điện tử, công nghệ tại phố Nhật Tảo hay đường 3/2. Tuy nhiên, việc tự ôm máy ra các khu phố này không phải lúc nào cũng dễ dàng. Nỗi lo bị "luộc đồ", tráo linh kiện hay bắt nhầm bệnh luôn khiến nhiều người e ngại.</p>

<h3>Sửa Chữa Minh Bạch - Thay Thế Tận Mắt</h3>
<p>Để đập tan nỗi lo đó, <strong>FastFix</strong> triển khai dịch vụ sửa chữa máy tính tận nhà tại Quận 10. Thay vì bạn mang máy đi, chúng tôi mang cả "trung tâm bảo hành" đến tận phòng của bạn:</p>
<ul>
  <li>Khách hàng quan sát 100% quá trình chẩn đoán lỗi và tháo lắp máy.</li>
  <li>Linh kiện thay thế (Ổ cứng, RAM, Pin, Nguồn) còn nguyên seal, bảo hành chính hãng từ 12-36 tháng.</li>
  <li>Đội ngũ kỹ thuật tư vấn phương án tối ưu nhất, không thay mới nếu linh kiện cũ còn sửa được với chi phí tiết kiệm.</li>
</ul>

<img src="/articles/sua-may-tinh-quan-10-1.jpg" alt="Thay thế linh kiện chính hãng trước mặt khách hàng tại Quận 10" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Giá Cả Hợp Lý Chữa Đúng Bệnh</h3>
<p>Tại FastFix, bạn sẽ nhận được báo giá cụ thể trước khi làm. Chúng tôi cung cấp dịch vụ <strong>chất lượng cao, giá thành hợp lý và tuyệt đối minh bạch</strong>, tránh xa các cạm bẫy giá cực rẻ nhưng linh kiện kém chất lượng. Cần hỗ trợ nhanh ở Quận 10? Ghé qua <a href="/">FastFix</a> ngay nhé!</p>`
  },
  {
    slug: 'sua-may-tinh-quan-11',
    content: `<h2>Sửa Máy Tính Quận 11 - Hỗ Trợ Nhanh Chóng Cho Kinh Doanh</h2>
<p>Quận 11 nổi bật với sự nhộn nhịp của các khu vực buôn bán, chợ lớn và rất nhiều shop kinh doanh online, hộ gia đình nhỏ. Khi máy tính bán hàng trục trặc hay máy in bill không hoạt động, đơn hàng có thể bị ùn ứ, gây thất thoát lớn.</p>

<h3>Đồng Hành Cùng Chủ Shop & Gia Đình</h3>
<p><strong>FastFix</strong> hiểu tốc độ là yếu tố then chốt. Chúng tôi có mặt kịp thời tại Quận 11 để xử lý nhanh:</p>
<ul>
  <li>Sửa lỗi phần mềm quản lý bán hàng (KiotViet, Sapo) bị đơ, không xuất được file.</li>
  <li>Kết nối và cấu hình lại máy in hóa đơn, máy quét mã vạch.</li>
  <li>Cài đặt Windows, Office, dọn rác máy tính cho con em học online tại nhà mượt mà.</li>
</ul>

<img src="/articles/sua-may-tinh-quan-11-1.jpg" alt="Sửa chữa máy tính và thiết bị bán hàng tại Quận 11" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Đúng Bệnh Đúng Tiền - Nói Không Với Dịch Vụ Kém</h3>
<p>Chúng tôi tập trung vào <strong>giá trị sử dụng lâu dài với chi phí cực kỳ hợp lý</strong>. Kinh doanh thì cần máy móc ổn định, đừng vì ham sửa giá rẻ vài chục ngàn mà hôm sau máy lại hỏng, ảnh hưởng tới việc làm ăn. FastFix cam kết bảo hành dịch vụ chu đáo cho mọi khách hàng Quận 11.</p>`
  },
  {
    slug: 'sua-may-tinh-quan-12',
    content: `<h2>Sửa Máy Tính Quận 12 - Không Ngại Đường Xa</h2>
<p>Nằm ở vị trí ven trung tâm với diện tích rộng, Quận 12 tập trung nhiều xưởng sản xuất, khu phố mới và các hộ gia đình. Đôi khi việc tìm được một trung tâm sửa chữa máy tính uy tín gần nhà (khu vực Tô Ký, Nguyễn Ảnh Thủ, An Sương) là điều rất khó khăn, việc mang máy đi xa thì lại nhiều rủi ro va đập.</p>

<h3>Đội Ngũ Kỹ Thuật Trực Sẵn Tại Quận 12</h3>
<p>Đừng lo lắng! <strong>FastFix</strong> có đội ngũ kỹ thuật viên phụ trách riêng khu vực Quận 12, sẵn sàng cơ động đến tận xưởng, tận nhà bạn:</p>
<ul>
  <li>Cài đặt phần mềm chuyên dụng (vẽ 3D, CNC, thiết kế rập) cho các xưởng gia công.</li>
  <li>Khắc phục tình trạng PC bật không lên nguồn, kêu tít tít do bụi bẩn, ẩm mốc.</li>
  <li>Thiết lập hệ thống camera an ninh và mạng máy tính ổn định cho kho xưởng.</li>
</ul>

<img src="/articles/sua-may-tinh-quan-12-1.jpg" alt="Sửa chữa máy tính tận xưởng tại Quận 12" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Phục vụ tận tâm - Chi phí hợp lý</h3>
<p>Với châm ngôn <strong>"Đã nhận là sửa dứt điểm, giá cả hợp lý, đáng đồng tiền"</strong>, FastFix không vì quãng đường xa mà thu thêm phụ phí bất hợp lý. Chúng tôi mong muốn xây dựng niềm tin lâu dài với bà con tại khu vực Quận 12. Xem chi tiết các dịch vụ tại <a href="/">Trang chủ</a> của chúng tôi.</p>`
  },
  {
    slug: 'sua-may-tinh-binh-tan',
    content: `<h2>Sửa Máy Tính Bình Tân - Giải Pháp Công Nghệ Tận Cửa</h2>
<p>Bình Tân đang phát triển cực nhanh với các khu đô thị sầm uất như Tên Lửa, khu vực quanh Aeon Mall... Kéo theo đó là nhu cầu học tập, giải trí và làm việc bằng máy tính rất lớn. Bất kỳ ai cũng có thể rơi vào tình huống dở khóc dở cười khi chiếc laptop đột ngột màn hình đen xì hay WiFi không thể kết nối.</p>

<h3>Bắt Bệnh Chuẩn Xác - Tiết Kiệm Thời Gian</h3>
<p>Tại Bình Tân, <strong>FastFix</strong> tự hào là đối tác hỗ trợ IT tin cậy của hàng ngàn hộ gia đình:</p>
<ul>
  <li>Cài đặt cấp tốc hệ điều hành, diệt virus và khôi phục dữ liệu cá nhân bị mất.</li>
  <li>Bảo dưỡng, vệ sinh máy tính bàn (PC), thay keo tản nhiệt định kỳ.</li>
  <li>Nâng cấp phần cứng máy tính để chơi game, dựng video không lo giật lag.</li>
</ul>

<img src="/articles/sua-may-tinh-binh-tan-1.jpg" alt="Sửa chữa và cài đặt máy tính tại khu dân cư Bình Tân" className="w-full rounded-xl my-6 border border-slate-200 shadow-sm" />

<h3>Thợ Lành Nghề - Chi Phí Xứng Đáng</h3>
<p>Chúng tôi tập trung cạnh tranh bằng **chất lượng dịch vụ xuất sắc và mức giá hợp lý**, hoàn toàn không sử dụng chiêu trò giá siêu rẻ để giảm bớt công đoạn kỹ thuật. Máy móc sửa xong chạy mượt mà, khách hàng yên tâm, đó mới là điều FastFix hướng tới. Nếu ở Bình Tân cần gọi thợ, hãy nhớ ngay tới FastFix!</p>`
  }
];

async function updateArticles() {
  for (const item of articlesData) {
    try {
      // Find article first
      const article = await prisma.article.findUnique({
        where: { slug: item.slug }
      });
      
      if (article) {
        await prisma.article.update({
          where: { slug: item.slug },
          data: {
            content: item.content,
            description: item.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...',
          }
        });
        console.log(`✅ Cập nhật thành công: ${item.slug}`);
      } else {
        console.log(`⚠️ Không tìm thấy bài viết với slug: ${item.slug}`);
      }
    } catch (error) {
      console.error(`❌ Lỗi khi cập nhật ${item.slug}:`, error);
    }
  }
}

updateArticles()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Hoàn tất script cập nhật.");
  });
