const demoPhotoUrl =
  "https://rukminim2.flixcart.com/image/850/1000/jgpfs7k0/poster/n/u/f/medium-gsp-070-one-good-thing-about-music-when-it-hits-you-you-original-imaf4vqtcyyrgnzx.jpeg?q=90&crop=false"
export default function Home() {
  return (
    <>
      <div className="homepage-container flex align-center justify-center column row-2">
        <img src={demoPhotoUrl} className="self-center "></img>
        <h2>welcome To lyrical!</h2>
        <h3>create songs, or be inspired from artists</h3>
        <h4>the choice is yours 🎼</h4>
      </div>
    </>
  )
}
