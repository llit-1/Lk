import "./IncomeLevelCards.css"

export const IncomeLevelCards = () => {
  return (
    <div className='incomeCard'>
        <div className='incomeCard_header'>
                Уровень <p className='header_textMark'>дохода</p> 
        </div>
        
        <div className="shifts_wrapper">

        <div className='incomeCard_body' style={{backgroundColor: "#FDE3D8"}}>
            <p className='body_textmark'>Основной продавец</p>
            <b>График работы: сменный от 8 часов с 06:30</b>

            <table className='incomeCard_table'>
                <tbody>
                    <tr>
                        <td className="table_lefttd">
                            Базовая ставка в час при стаже до 6 мес.
                            <br/>
                            при выработке 15 смен / 187,5 часов
                        </td>
                        <td align='center'><b>230</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Базовая ставка в час, если менее 187,5 часов</td>
                        <td align='center'><b>220</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd" align='center' colSpan={2}><b>Индексация зарплаты каждые 6 мес.</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 6 мес.</td>
                        <td align='center'><b>240</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 12 мес.</td>
                        <td align='center'><b>250</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 18 мес.</td>
                        <td align='center'><b>260</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 24 мес.</td>
                        <td align='center'><b>270</b></td>
                    </tr>
                </tbody>
            </table>

            <p className='body_textmark-fullWidth'>Бонус: премия за аудиты + 10 руб. в час при стаже от 1 мес.</p>
            <div className='body_text'>
                <b>Staff питание: макси-комбо (смены от 12 часов)</b>
                <b>медиум-комбо (смены от 8 часов)</b>
            </div>
        </div>

        <div className='incomeCard_body' style={{backgroundColor: "#F9B3AB"}}>
            <p className='body_textmark'>Ночной продавец</p>
            <b>График работы: сменный от 12 часов</b>

            <table className='incomeCard_table'>
                <tbody>
                    <tr>
                        <td className="table_lefttd">
                            Базовая ставка в час при стаже до 6 мес.
                            <br/>
                            при выработке 15 смен / 180 часов
                        </td>
                        <td align='center'><b>250</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Базовая ставка в час, если менее 180 часов</td>
                        <td align='center'><b>240</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd" align='center' colSpan={2}><b>Индексация зарплаты каждые 6 мес.</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 6 мес.</td>
                        <td align='center'><b>260</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 12 мес.</td>
                        <td align='center'><b>270</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 18 мес.</td>
                        <td align='center'><b>280</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 24 мес.</td>
                        <td align='center'><b>290</b></td>
                    </tr>
                </tbody>
            </table>

            <p className='body_textmark-fullWidth'>Бонус: премия за аудиты + 10 руб. в час при стаже от 1 мес.</p>
            <div className='body_text'>
                <b>Staff питание: макси-комбо (смены от 12 часов)</b>
            </div>
        </div>

        <div className='incomeCard_body' style={{backgroundColor: "#F59785"}}>
            <p className='body_textmark'>Вечерний продавец</p>
            <b>График работы: сменный от 4 часов с 19:00</b>

            <table className='incomeCard_table'>
                <tbody>
                    <tr>
                        <td className="table_lefttd">
                            Базовая ставка в час при стаже до 6 мес.
                        </td>
                        <td align='center'><b>210</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd" align='center' colSpan={2}><b>Индексация зарплаты каждые 6 мес.</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 6 мес.</td>
                        <td align='center'><b>220</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 12 мес.</td>
                        <td align='center'><b>230</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 18 мес.</td>
                        <td align='center'><b>240</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 24 мес.</td>
                        <td align='center'><b>250</b></td>
                    </tr>
                </tbody>
            </table>

            <p className='body_textmark-fullWidth'>Бонус: премия за аудиты + 10 руб. в час при стаже от 1 мес.</p>
            <div className='body_text'>
                <b>Staff питание: мини-комбо (смены от 4 часов)</b>
            </div>
        </div>

        <div className='incomeCard_body' style={{backgroundColor: "#F3B990"}}>
            <p className='body_textmark'>Работник пекарни</p>
            <b>График работы: сменный от 12 часов с 07:00</b>

            <table className='incomeCard_table'>
                <tbody>
                    <tr>
                        <td className="table_lefttd">
                            Базовая ставка в час при стаже до 6 мес.
                        </td>
                        <td align='center'><b>210</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd" align='center' colSpan={2}><b>Индексация зарплаты каждые 6 мес.</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 6 мес.</td>
                        <td align='center'><b>220</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 12 мес.</td>
                        <td align='center'><b>230</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 18 мес.</td>
                        <td align='center'><b>240</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 24 мес.</td>
                        <td align='center'><b>250</b></td>
                    </tr>
                </tbody>
            </table>

            <p className='body_textmark-fullWidth'>Бонус: премия за аудиты + 10 руб. в час при стаже от 1 мес.</p>
            <div className='body_text'>
                <b>Staff питание: макси-комбо (смены от 12 часов)</b>
            </div>
        </div>

        <div className='incomeCard_body' style={{backgroundColor: "#FAD5A2"}}>
            <p className='body_textmark'>Продавец с гибким графиком</p>
            <b>График работы: сменный от 4 часов</b>

            <table className='incomeCard_table'>
                <tbody>
                    <tr>
                        <td className="table_lefttd">
                            Базовая ставка в час при стаже до 6 мес.
                        </td>
                        <td align='center'><b>210</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd" align='center' colSpan={2}><b>Индексация зарплаты каждые 6 мес.</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 6 мес.</td>
                        <td align='center'><b>220</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 12 мес.</td>
                        <td align='center'><b>230</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 18 мес.</td>
                        <td align='center'><b>нет</b></td>
                    </tr>
                    <tr>
                        <td className="table_lefttd">Ставка через 24 мес.</td>
                        <td align='center'><b>нет</b></td>
                    </tr>
                </tbody>
            </table>

            <p className='body_textmark-fullWidth'>Бонус: премия за аудиты + 10 руб. в час при стаже от 1 мес.</p>
            <div className='body_text'>
                <b>Staff питание: стафф-комбо в соответствии</b>
                <b>с продолжительностью смены</b>
            </div>
        </div>
        

        <div className='incomeCard_body incomeCard_questions'>
            <div className='incomeCard_header'>
                    Если остались <p className='header_textMark'>вопросы</p> 
            </div>

            <div className="incomeCard_telText">
                <b>Любые вопросы, в том числе по расчету</b>
                <br/>
                <b>заработной платы и аванса, а также датам выплат</b>
                <b>вы можете задать отделу персонала по телефону</b>
            </div>

            <div className="incomeCard_tel">
                <a href="tel:+79643989073">+7 (964) 398-90-73</a>
            </div>
        </div>
    </div>

    </div>
  )
}
