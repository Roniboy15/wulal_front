import { Link } from "react-router-dom";

function LanguageSelection({ setShowLangBtn, handleLanguageSelection, width, fetchQuotes, showLangBtn }) {
    return (
        <div className="language-selection">
            <div className='row'>
                <div onClick={()=>setShowLangBtn(false)} className='col-12 text-center'>
                    <img width={width < 500 ? 250 : 350} src='https://res.cloudinary.com/dg4sxlbfs/image/upload/v1693400461/wulal/091596CA-1BB3-4C99-9A78-25308D9CDA3D_xiqj8i.jpg'></img>
                </div>
                <div className='col-12 text-center mt-3'>
                    {showLangBtn ?
                        <div className="mt-4">
                            <Link style={{textDecoration:"none"}} to={"/flipbook"} className=' btn-lang p-2' onClick={() => handleLanguageSelection('deutsch')}>Deutsch</Link>
                            <Link style={{textDecoration:"none"}} to={"/flipbook"} className=' btn-lang p-2' onClick={() => handleLanguageSelection('english')}>English</Link>
                        </div>
                        :
                        <div className="">
                            <Link style={{textDecoration:"none"}} to={"/quotes"} className='btn-lang p-2' onClick={() => fetchQuotes()}>Quotes</Link>
                            <button className='btn-lang border-0 p-2' onClick={() => setShowLangBtn(true)}>Prayer Sheets</button>
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default LanguageSelection;