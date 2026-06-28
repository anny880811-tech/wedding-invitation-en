import { useForm, Controller } from "react-hook-form"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import Select from "react-select"
import axios from "axios"
import { useRef, useState } from "react"


const RSVP = () => {
  const sheetdbUrl = '/api/rsvp'
  const [confirmModal, setConfirmModal] = useState(false)
  const [pendingData, setPendingData] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const rsvpRef = useRef(null)
  const options = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} 人`,
  }));
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "8px",
      borderColor: state.isFocused ? "rgba(128, 0, 32, 0.3)" : "rgba(128, 0, 32, 0)",
      minHeight: "32px",
      height: "32px",
      backgroundColor: "#F8F4ED",
      boxShadow: "none",
      "&:hover": {
        borderColor: "rgba(128, 0, 32, 0.5)",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fdf6f0",
      borderRadius: "8px",
      overflow: "hidden",
      marginTop: "4px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#800020"
        : state.isFocused
          ? "rgba(128, 0, 32, 0.1)"
          : "transparent",
      color: state.isSelected ? "#fff" : "#333",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#333",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#999",
      fontSize: "14px",  // 縮小字級
      margin: 0,
      lineHeight: "32px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "32px",
    }),
    valueContainer: (base) => ({
      ...base,
      height: "32px",
      padding: "0 8px 0 12px",
      display: "flex",
      alignItems: "center",
      flexWrap: "nowrap",
    }),
  };
  const formatDate = (date) => date ? format(date, "MM/dd/yyyy") : ""
  const formatTime = (date) => date ? format(date, "hh:mm a") : ""
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: {
      joinStatus: "",
      statistics: null,
      arrivalDate: null,
      arrivalTime: null,
      departureDate: null,
      departureTime: null,
      travelPlanDate: null,
      allergyStatus: "",
      needStatus: "",
      journeyStatus: "",
    }
  })
  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      arrivalDate: formatDate(data.arrivalDate),
      arrivalTime: formatTime(data.arrivalTime),
      departureDate: formatDate(data.departureDate),
      departureTime: formatTime(data.departureTime),
    }
    setPendingData(formattedData)
    setConfirmModal(true)
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      await axios.post(sheetdbUrl, pendingData)
      setConfirmModal(false)
      setIsSubmitted(true)
      setTimeout(() => {
        rsvpRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
      console.log(JSON.stringify({ data: [pendingData] }, null, 2))
    } catch (error) {
      console.error("送出錯誤:", error.response?.data || error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const allergyStatus = watch('allergyStatus')
  const needStatus = watch('needStatus')
  const joinStatus = watch('joinStatus')
  const departureInfoStatus = watch('departureInfoStatus')
  const arrivalInfoStatus = watch('arrivalInfoStatus')
  if (isSubmitted) {
    return (
      <div className="RSVP-custom" ref={rsvpRef}>
        <div className="section-title">GUEST REGISTRATION</div>
        <h3 className="section-header">賓客登記</h3>
        <div className="section-heading__divider"></div>
        <div className="submitted-message">
          <h4>感謝您的回覆</h4>
          <p className="en">Thank you for your response</p>
          <p>我們已收到您的出席資訊</p>
          <p>期待與您在峇里島相見 </p>
          <p className="en">We have received your information and look forward to celebrating with you in Bali.</p>
        </div>
      </div>
    )
  }

  return (<>
    {confirmModal && pendingData && (
      <div className="modal-overlay">
        <div className="modal-box">
          <h4 className="modal-title">請確認您的填寫資料</h4>
          <p className="modal-subtitle en">Please review your information before submitting.</p>
          <div className="modal-content">
            {pendingData.joinStatus === "no" ? (
              <>
                <p>姓名：{pendingData.name}</p>
                <p>出席狀態：無法參加</p>
              </>
            ) : (
              <table className="modal-table">
                <tbody>
                  <tr><td>姓名 name</td><td>{pendingData.name}</td></tr>
                  <tr><td>參加人數 Guest Count</td><td>{pendingData.statistics} 人</td></tr>
                  <tr><td>信箱 Email</td><td>{pendingData.email}</td></tr>
                  <tr>
                    <td>抵達 Arrival</td>
                    <td>{pendingData.arrivalDate} {pendingData.arrivalTime}<br />{pendingData.arrivalInfoStatus}</td>
                  </tr>
                  <tr>
                    <td>離開 Departure</td>
                    <td>{pendingData.departureDate} {pendingData.departureTime}<br />{pendingData.departureInfoStatus}</td>
                  </tr>
                  <tr>
                    <td>食物過敏 Allergy</td>
                    <td>{pendingData.allergyStatus === "none" ? "無" : pendingData.allergyContent || "有"}</td>
                  </tr>
                  <tr>
                    <td>特殊需求 Need</td>
                    <td>{pendingData.needStatus === "none" ? "無" : pendingData.needContent || "有"}</td>
                  </tr>
                  {pendingData.journeyStatus && (
                    <tr><td>行程選擇 Journey</td><td>{pendingData.journeyStatus} 行程</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={() => setConfirmModal(false)} disabled={isSubmitting}>
              返回修改<span className="en"> Edit</span>
            </button>
            <button className="modal-btn confirm" onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting ? "送出中..." : "確認送出"}
              {!isSubmitting && <span className="en"> Confirm</span>}
            </button>
          </div>
        </div>
      </div>
    )}
    <div className="RSVP-custom" ref={rsvpRef}>
      <div className="section-title">GUEST REGISTRATION</div>
      <h3 className="section-header">賓客登記</h3>
      <div className="section-heading__divider"></div>
      <div className="form-container">
        <div className="remind">
          <p>為了讓我們更好的安排一切</p>
          <p>請協助填寫以下資料</p>
          <p className="warn-text">於8/31前填寫完成</p>
          <p className="en">To help us make the necessary arrangements, <br />
            please complete the information below.</p>
          <p className="en warn-text">Kindly submit your response
            by August 31.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-custom">
            <div className="form-group">
              <label htmlFor="name">姓名 name </label>
              <input type="text" id="name" placeholder="請填寫您的姓名" {...register('name', {
                required: '請填寫您的姓名'
              })} />
              <span>{errors.name ? errors.name.message : ''}</span>
            </div>
            <div className="form-group">
              <div>請問是否參加我們的婚禮？</div>
              <div className="en">Will you be attending our wedding?</div>
              <div className="checkbox-group">
                <div>
                  <input type="radio" className="checkbox" id="join" value="yes" {...register('joinStatus', {
                    required: '請選擇是否參加婚禮',
                  })} />
                  <label htmlFor="join">我會參加<span className="en" style={{ display: 'block' }}>I will attend</span></label>
                </div>
                <div>
                  <input type="radio" className="checkbox" id="noJoin" value='no' {...register('joinStatus')} />
                  <label htmlFor="noJoin">無法參加 <span className="en" style={{ display: 'block' }}>I am unable to attend</span></label>
                </div>
              </div>
              <span>{errors.joinStatus ? errors.joinStatus.message : ''}</span>
            </div>
            {joinStatus === 'yes' && (<>
              <div className="form-group">
                <label htmlFor="statistics">1. 參加人數<br/> Guest Count</label>
                <Controller
                  control={control}
                  name="statistics"
                  rules={{ required: "請選擇參加人數" }}
                  render={({ field }) => (
                    <Select
                      inputId="statistics"
                      options={options}
                      onChange={(selected) => field.onChange(selected?.value)}
                      value={options.find(opt => opt.value === field.value) || null}
                      placeholder="請選擇人數"
                      styles={selectStyles}
                    />
                  )}
                />
                {errors.statistics && (
                  <span>{errors.statistics.message}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">2. Email <br /> (詳細活動於婚禮前1個月email通知) <br />Detailed event information will be sent via email one month before the wedding.</label>
                <input type="text" id="email" placeholder="請填寫您的Email" {...register('email', {
                  required: '請填寫您的Email'
                })} />
                <span>{errors.email ? errors.email.message : ''}</span>
              </div>
              <div className="form-group">
                <div>3. 抵達峇里島的時間(安排接駁車用)
                  <br />Arrival Information</div>
                <div className="flight-group">
                  <div className="form-field">
                    <label htmlFor="arrivalDate">抵達日期 <br />Arrival Date</label>
                    <Controller
                      control={control}
                      name="arrivalDate"
                      rules={{ required: "請選擇抵達日期" }}
                      render={({ field }) => (
                        <DatePicker
                          id="arrivalDate"
                          placeholderText=" 月 / 日 / 年"
                          selected={field.value}
                          popperPlacement="bottom-start"
                          onChange={(date) => { field.onChange(date) }} />
                      )}
                    />
                    {errors.arrivalDate && (
                      <span>{errors.arrivalDate.message}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="arrivalTime">抵達時間 <br />Arrival Time</label>
                    <Controller
                      control={control}
                      name="arrivalTime"
                      rules={{ required: "請選擇抵達時間" }}
                      render={({ field }) => (<DatePicker
                        id="arrivalTime"
                        placeholderText="--：-- --"
                        selected={field.value}
                        onChange={(time) => field.onChange(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="時間"
                        dateFormat="hh:mm aa"
                      />)}
                    /> {errors.arrivalTime && (
                      <span>{errors.arrivalTime.message}</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div>請選擇抵達航空資訊？<br />Share your flight details?</div>
                  <div className="checkbox-group vertical">
                    <div>
                      <input type="radio" className="checkbox" id="CI771" value="中華航空  航班CI771" {...register('arrivalInfoStatus', { required: '請選擇抵達航空資訊', })} />
                      <label htmlFor="CI771">中華航空  航班CI771</label>
                    </div>
                    <div>
                      <input type="radio" className="checkbox" id="BR255" value="長榮航空  航班BR255" {...register('arrivalInfoStatus')} />
                      <label htmlFor="BR255">長榮航空  航班BR255</label>
                    </div>
                    <div>
                      <input type="radio" className="checkbox" id="otherArrivalInfo" value='other' {...register('arrivalInfoStatus')} />
                      <label htmlFor="otherArrivalInfo">其他 (請說明)<span className="en" style={{ display: 'block' }}>other (please specify)</span></label>
                    </div>
                  </div>
                  <span>{errors.arrivalInfoStatus ? errors.arrivalInfoStatus.message : ''}</span>
                  {arrivalInfoStatus === 'other' && (<textarea placeholder="例如：需轉機等等..." {...register('arrivalInfoContent', { required: '請填寫抵達航空資訊', })}></textarea>)}
                  <span>{errors.arrivalInfoContent ? errors.arrivalInfoContent.message : ''}</span>
                </div>
              </div>
              <div className="form-group">
                <div>4. 離開峇里島的時間(安排接駁車用)
                  <br />Departure Information</div>
                <div className="flight-group">
                  <div className="form-field">
                    <label htmlFor="departureDate">離開日期<br />Departure Date</label>
                    <Controller
                      control={control}
                      name="departureDate"
                      rules={{ required: "請選擇離開日期" }}
                      render={({ field }) => (
                        <DatePicker
                          id="departureDate"
                          placeholderText=" 月 / 日 / 年"
                          selected={field.value}
                          popperPlacement="bottom-start"
                          onChange={(date) => { field.onChange(date) }} />
                      )}
                    />
                    {errors.departureDate && (
                      <span>{errors.departureDate.message}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="departureTime">離開時間<br />Departure Time</label>
                    <Controller
                      control={control}
                      name="departureTime"
                      rules={{ required: "請選擇離開時間" }}
                      render={({ field }) => (
                        <DatePicker
                          id="departureTime"
                          placeholderText=" --：-- --"
                          selected={field.value}
                          onChange={(time) => field.onChange(time)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="時間"
                          dateFormat="hh:mm aa"
                        />
                      )} />
                    {errors.departureTime && (
                      <span>{errors.departureTime.message}</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div>請選擇離開航空資訊？<br />Share your flight details?</div>
                  <div className="checkbox-group vertical">
                    <div>
                      <input type="radio" className="checkbox" id="CI772" value="中華航空  航班CI772" {...register('departureInfoStatus', { required: '請選擇離開航空資訊', })} />
                      <label htmlFor="CI772">中華航空  航班CI772</label>
                    </div>
                    <div>
                      <input type="radio" className="checkbox" id="BR256" value="長榮航空  航班BR256" {...register('departureInfoStatus')} />
                      <label htmlFor="BR256">長榮航空  航班BR256</label>
                    </div>
                    <div>
                      <input type="radio" className="checkbox" id="otherDepartureInfo" value='other' {...register('departureInfoStatus')} />
                      <label htmlFor="otherDepartureInfo">其他 (請說明)<span className="en" style={{ display: 'block' }}>other (please specify)</span></label>
                    </div>
                  </div>
                  <span>{errors.departureInfoStatus ? errors.departureInfoStatus.message : ''}</span>
                  {departureInfoStatus === 'other' && (<textarea placeholder="例如：需轉機等等..." {...register('departureInfoContent', { required: '請填寫離開航空資訊', })}></textarea>)}
                  <span>{errors.departureInfoContent ? errors.departureInfoContent.message : ''}</span>
                </div>
              </div>
              <div className="form-group">
                <div>5. 是否對任何食物過敏？<br />Do you have any food allergies or dietary restrictions?</div>
                <div className="checkbox-group">
                  <div>
                    <input type="radio" className="checkbox" id="noAllergies" value="none" {...register('allergyStatus', { required: '請選擇是否有食物過敏', })} />
                    <label htmlFor="noAllergies">無 No</label>
                  </div>
                  <div>
                    <input type="radio" className="checkbox" id="allergies" value='yes' {...register('allergyStatus')} />
                    <label htmlFor="allergies">有 (請說明)<span className="en" style={{ display: 'block' }}>Yes (please specify)</span></label>

                  </div>
                </div>
                <span>{errors.allergyStatus ? errors.allergyStatus.message : ''}</span>
                {allergyStatus === 'yes' && (<textarea placeholder="例如：花生、海鮮、素食、宗教飲食等" {...register('allergyContent', { required: '請填寫您的飲食需求', })}></textarea>)}
                <span>{errors.allergyContent ? errors.allergyContent.message : ''}</span>
              </div>
              <div className="form-group">
                <div>6. 是否有其他特殊需求？<br />Do you have any special requests or requirements?</div>
                <div className="checkbox-group">
                  <div>
                    <input type="radio" className="checkbox" id="noNeed" value='none' {...register('needStatus', { required: '請選擇是否有特殊需求', })} />
                    <label htmlFor="noNeed">無 No</label>
                  </div>
                  <div>
                    <input type="radio" className="checkbox" id="need" value='yes' {...register('needStatus')} />
                    <label htmlFor="need">有 (請說明)<span className="en" style={{ display: 'block' }}>Yes (please specify)</span></label>
                  </div>
                </div>
                <span>{errors.needStatus ? errors.needStatus.message : ''}</span>
                {needStatus === 'yes' && (<textarea placeholder="例如：兒童座椅、輪椅協助等" {...register('needContent', { required: '請填寫您的需求', })}></textarea>)}
                <span>{errors.needContent ? errors.needContent.message : ''}</span>
              </div>
              <div className="form-group">
                <div>7. 1/24在婚禮開始之前，我們誠摯邀請您依照自己的步調，感受貝都古高地的自然之美(請擇一)
                  <br />Before the wedding celebration, we invite you to enjoy the beauty of Bedugul at your own pace.
                </div>
                <div className="checkbox-group">
                  <div>
                    <input type="radio" className="checkbox" id="aJourney" value="A" {...register('journeyStatus')} />
                    <label htmlFor="aJourney" className="a">A 行程<span className="en" style={{ display: 'block' }}>A. Resort Day</span></label>
                  </div>
                  <div>
                    <input type="radio" className="checkbox" id="bJourney" value='B' {...register('journeyStatus')} />
                    <label htmlFor="bJourney" className="b">B 行程<span className="en" style={{ display: 'block' }}>B. Exploration Day</span></label>
                  </div>
                </div>
                <div className="tour-custom">
                  <div className="tour a">
                    A 行程 Relax at the Resort<br />
                    在度假村享受愜意時光，體驗度假村提供的設施、活動與餐飲服務。
                    請注意，度假村內的活動與餐飲皆為自由參加，相關費用需自行負擔。部分活動可能需要提前預約。
                    <br />
                    <span className="" style={{ marginTop: '0.5rem', fontSize: '15px', display: 'block', lineHeight: '1.3', color: '#F4EFEA' }}>Spend a leisurely day at HOMM Saranam Baturiti and enjoy the facilities, activities, and lunch options available at the resort.
                      Please note that resort activities and meals are optional and will be at your own expense. Advance reservations may be required for certain activities.
                    </span>

                    <a href='https://www.hommhotels.com/hotels/homm-saranam-baturiti#offers-linked' target="_blank" rel="noreferrer" className="tour-link">
                      更多資訊 For more information<i className="bi bi-chevron-right"></i>
                    </a>
                  </div>
                  <div className="tour b">
                    B 行程 Discover Bedugul<br />
                    探索貝都古最具代表性的景點與在地體驗：
                    <ul>
                      <li>草莓農園</li>
                      <li>烏倫達努布拉坦寺與布拉坦湖</li>
                      <li>峇里植物園</li>
                      <li>峇里農場莊園</li>
                    </ul>
                    <div>
                      若您有興趣參加，我們將協助安排交通及行程預訂。每位賓客酌收現金 NTD 1,000，費用包含交通接駁、景點門票及午餐。
                      此為自由參加行程，適合希望在婚禮開始前探索貝都古的賓客。行程結束後，將返回度假村，準時參加婚禮儀式與晚宴。
                    </div><br />
                    Explore some of Bedugul's most popular attractions and local experiences：
                    <ul>
                      <li>Strawberry Farms</li>
                      <li>Ulun Danu Beratan Temple & Lake</li>
                      <li>Bali Botanical Garden</li>
                      <li> Bali Farm House</li>
                    </ul>
                    <div>
                      We will be happy to arrange transportation and coordinate the excursion for guests who would like to join. A contribution of NTD 1,000 cash per guest will cover transportation, attraction entrance fees, and lunch during the excursion.
                      This optional excursion is designed for guests who would like to explore Bedugul before returning to the resort in time for the wedding ceremony and reception.
                    </div>
                  </div>
                  <div className="content">無論您選擇在度假村放鬆休憩，或是探索周邊風景，我們都希望您能盡情享受留下美好的回憶</div>
                  <div className="en content">Whether you choose to unwind at the resort or explore the surrounding area, we hope you enjoy a memorable and wonderful experience.</div>
                </div>
              </div>
            </>)}
            <button type="submit" className="form-btn" disabled={isSubmitting}>{isSubmitting ? '表單送出中 Submitting...' : '送出回覆 Submit Response'}</button>
          </div>
        </form>
      </div>
    </div>
  </>)
}

export default RSVP