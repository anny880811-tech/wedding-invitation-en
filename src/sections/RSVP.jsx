import { useForm, Controller } from "react-hook-form"
// import { format } from "date-fns"
// import DatePicker from "react-datepicker"
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
    label: `${i + 1} ${i === 0 ? 'person' : 'people'}`,
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
  // const formatDate = (date) => date ? format(date, "MM/dd/yyyy") : ""
  // const formatTime = (date) => date ? format(date, "hh:mm a") : ""
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
      // arrivalDate: null,
      // arrivalTime: null,
      // departureDate: null,
      // departureTime: null,
      // travelPlanDate: null,
      allergyStatus: "",
      needStatus: "",
      journeyStatus: "",
    }
  })
  const onSubmit = async (data) => {
    // const formattedData = {
    //   ...data,
    //   arrivalDate: formatDate(data.arrivalDate),
    //   arrivalTime: formatTime(data.arrivalTime),
    //   departureDate: formatDate(data.departureDate),
    //   departureTime: formatTime(data.departureTime),
    // }
    setPendingData(data)
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
      // console.log(JSON.stringify({ data: [pendingData] }, null, 2))
    } catch (error) {
      console.error("送出錯誤:", error.response?.data || error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const allergyStatus = watch('allergyStatus')
  const needStatus = watch('needStatus')
  const joinStatus = watch('joinStatus')
  // const departureInfoStatus = watch('departureInfoStatus')
  // const arrivalInfoStatus = watch('arrivalInfoStatus')
  if (isSubmitted) {
    return (
      <div className="RSVP-custom" ref={rsvpRef}>
        {/* <div className="section-title">GUEST REGISTRATION</div> */}
        <h3 className="section-header">GUEST REGISTRATION</h3>
        {/* <h3 className="section-header">賓客登記</h3> */}
        <div className="section-heading__divider"></div>
        <div className="submitted-message">
          <p>Thank you for your response</p>
          <p className="en">We have received your information and look forward to celebrating with you in Bali.</p>
        </div>
      </div>
    )
  }

  return (<>
    {confirmModal && pendingData && (
      <div className="modal-overlay">
        <div className="modal-box">
          <h4 className="modal-title">Please review your information before submitting.</h4>
          <div className="modal-content">
            {pendingData.joinStatus === "no" ? (
              <>
                <p>Name：{pendingData.name}</p>
                <p>Attendance: Unable to attend</p>
              </>
            ) : (
              <table className="modal-table">
                <tbody>
                  <tr><td>name</td><td>{pendingData.name}</td></tr>
                  <tr><td>Guest Count</td><td>{pendingData.statistics}{pendingData.statistics === 1 ? 'person' : 'people'}</td></tr>
                  <tr><td>Email</td><td>{pendingData.email}</td></tr>
                  <tr>
                    <td>Allergy</td>
                    <td>{pendingData.allergyStatus === "none" ? "None" : pendingData.allergyContent || "Yes"}</td>
                  </tr>
                  <tr>
                    <td>Need</td>
                    <td>{pendingData.needStatus === "none" ? "None" : pendingData.needContent || "Yes"}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={() => setConfirmModal(false)} disabled={isSubmitting}>
              Edit
            </button>
            <button className="modal-btn confirm" onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm & Submit"}
            </button>
          </div>
        </div>
      </div>
    )}
    <div className="RSVP-custom" ref={rsvpRef}>
      {/* <div className="section-title">GUEST REGISTRATION</div> */}
      <h3 className="section-header">GUEST REGISTRATION</h3>
      {/* <div className="section-heading__divider"></div> */}
      <div className="form-container">
        <div className="remind">
          <p className="en">To help us make the necessary arrangements, <br />
            please complete the information below.</p>
          <p className="en warn-text">Kindly submit your response
            by August 31.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-custom">
            <div className="form-group">
              <label htmlFor="name">name </label>
              <input type="text" id="name" placeholder="Please enter your name" {...register('name', {
                required: 'Please enter your name'
              })} />
              <span>{errors.name ? errors.name.message : ''}</span>
            </div>
            <div className="form-group">
              {/* <div>請問是否參加我們的婚禮？</div> */}
              <div className="en">Will you be attending our wedding?</div>
              <div className="checkbox-group">
                <div>
                  <input type="radio" className="checkbox" id="join" value="yes" {...register('joinStatus', {
                    required: 'Please let us know your attendance.',
                  })} />
                  <label htmlFor="join">I will attend</label>
                </div>
                <div>
                  <input type="radio" className="checkbox" id="noJoin" value='no' {...register('joinStatus')} />
                  <label htmlFor="noJoin">I am unable to attend</label>
                </div>
              </div>
              <span>{errors.joinStatus ? errors.joinStatus.message : ''}</span>
            </div>
            {joinStatus === 'yes' && (<>
              <div className="form-group">
                <label htmlFor="statistics">1. Guest Count</label>
                <Controller
                  control={control}
                  name="statistics"
                  rules={{ required: "Number of guests?" }}
                  render={({ field }) => (
                    <Select
                      inputId="statistics"
                      options={options}
                      onChange={(selected) => field.onChange(selected?.value)}
                      value={options.find(opt => opt.value === field.value) || null}
                      placeholder="Number of guests?"
                      styles={selectStyles}
                    />
                  )}
                />
                {errors.statistics && (
                  <span>{errors.statistics.message}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">2. Email <br /> Detailed event information will be sent via email one month before the wedding.</label>
                <input type="text" id="email" placeholder="Please enter your email" {...register('email', {
                  required: 'Please enter your email'
                })} />
                <span>{errors.email ? errors.email.message : ''}</span>
              </div>
              {/* <div className="form-group">
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
              </div> */}
              <div className="form-group">
                <div>3. Do you have any food allergies or dietary restrictions?</div>
                <div className="checkbox-group">
                  <div>
                    <input type="radio" className="checkbox" id="noAllergies" value="none" {...register('allergyStatus', { required: 'Please let us know if you have any food allergies.', })} />
                    <label htmlFor="noAllergies">No</label>
                  </div>
                  <div>
                    <input type="radio" className="checkbox" id="allergies" value='yes' {...register('allergyStatus')} />
                    <label htmlFor="allergies">Yes (please specify)</label>

                  </div>
                </div>
                <span>{errors.allergyStatus ? errors.allergyStatus.message : ''}</span>
                {allergyStatus === 'yes' && (<textarea placeholder="Please specify here (e.g., Peanut allergy, Vegetarian...)" {...register('allergyContent', { required: 'Do you have any dietary restrictions?', })}></textarea>)}
                <span>{errors.allergyContent ? errors.allergyContent.message : ''}</span>
              </div>
              <div className="form-group">
                <div>4. Do you have any special requests or requirements?</div>
                <div className="checkbox-group">
                  <div>
                    <input type="radio" className="checkbox" id="noNeed" value='none' {...register('needStatus', { required: 'Please let us know if you have any special needs.', })} />
                    <label htmlFor="noNeed">No</label>
                  </div>
                  <div>
                    <input type="radio" className="checkbox" id="need" value='yes' {...register('needStatus')} />
                    <label htmlFor="need">Yes (please specify)</label>
                  </div>
                </div>
                <span>{errors.needStatus ? errors.needStatus.message : ''}</span>
                {needStatus === 'yes' && (<textarea placeholder="Please specify (e.g., Baby chair, Wheelchair access, None)" {...register('needContent', { required: 'Notes or special requests?', })}></textarea>)}
                <span>{errors.needContent ? errors.needContent.message : ''}</span>
              </div>
            </>)}
            <button type="submit" className="form-btn" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Response'}</button>
          </div>
        </form>
      </div>
    </div>
  </>)
}

export default RSVP