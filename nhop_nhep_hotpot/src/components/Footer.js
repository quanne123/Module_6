export default function Footer() {
return(
    <footer className="footer_section">
        <div className="container">
            <div className="row">
                <div className="col-md-4 footer-col">
                    <div className="footer_contact">
                        <h4>Liên hệ</h4>
                        <div className="contact_link_box">
                            <a href="">
                                <i className="fa fa-map-marker" aria-hidden="true" />
                                <span>Vị trí</span>
                            </a>
                            <a href="">
                                <i className="fa fa-phone" aria-hidden="true" />
                                <span>(+84) 934941413</span>
                            </a>
                            <a href="">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <span>nhopnhephotpot@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 footer-col">
                    <div className="footer_detail">
                        <a href="" className="footer-logo">
                            Lẩu Nướng Nhóp Nhép
                        </a>
                        <p>
                            Ăn được, uống được là phúc. Với nhiều người được ăn món mình thích,
                            uống nước mà mình yêu là điều tuyệt nhất với họ. Họ luôn lạc quan
                            suy nghĩ rằng: "đâu biết ngày mai ra sao mà chúng ta phải đau khổ,
                            làm điều mà mình không thích".
                        </p>
                    </div>
                </div>
                <div className="col-md-4 footer-col">
                    <h4>Giờ mở cửa</h4>
                    <p>Hằng Ngày</p>
                    <p>5:00 PM - 11:00 PM</p>
                </div>
            </div>
            <div className="footer-info">
                <p>
                    © <span id="" /> Độc quyền tại 45 Hải Phòng
                    <br />
                    <br />
                    © <span id="" /> Được thành lập bởi QuanTVA

                </p>
            </div>
        </div>
    </footer>

)
}