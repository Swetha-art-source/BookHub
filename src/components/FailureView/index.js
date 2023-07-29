import './index.css'

const FailureView = props => {
  const {callApi} = props

  return (
    <div className="failure-card">
      <img
        src="https://res.cloudinary.com/duws9fktk/image/upload/v1687170985/Mini-Project/Failure-images/Group_7522_h2ufij.png"
        className="failure-image"
        alt="failure view"
      />
      <p className="failure-msg">Something went wrong, Please try again.</p>
      <div>
        <button type="button" className="retry-button" onClick={callApi}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default FailureView
