import React from 'react'

export default function InforContact({css}) {
    return (
        <p style={{fontWeight:'bolder'}}>
            <strong>Market Design HAUI</strong>
            <br/>
            <img src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/11.png" alt="" width="15" height="22"/> 138 Phạm Văn Đồng- Xuân Đỉnh- Bắc Từ Liêm- Hà Nội
            <br/>
            <img src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/12.png" alt="" width="15" height="18"/>
            <a href="tel:0898709170" className={css}> 0898709170</a>
            <br/>
            <img src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/14.png" alt="" width="17" height="12"/>
            <span>
                <a href="mailto:laptrinhvn2s@gmail.com" className={css}> laptrinhvn2s@gmail.com</a>    
            </span>
            <br/>
            <img src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/15.png" alt="" width="17" height="21"/> https://www.marketdesignco.com/
        </p>
    )
}
