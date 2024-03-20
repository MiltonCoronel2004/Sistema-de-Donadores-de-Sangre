import background from "../assets/background.jpg"
const NotFoundPage = () => {
  return (
    <div style={{ width: '100%', height: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>

          <h1 className="text-white text-center" style={{width: '50%', height: '120px', backgroundColor: 'black'}}>Page not found</h1>

      </div>
    </div>
  )
}

export default NotFoundPage 