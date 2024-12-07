import LyricsSvg from "../assets/svgs/LyricsSvg.svg"
export default function Home() {
  return (
    <>
      <div className="homepage-container flex align-center justify-center column row-2">
        <img src={LyricsSvg} />
        <h2>welcome To lyrical!</h2>
        <h3>create songs, or be inspired from artists</h3>
        <h4>the choice is yours 📝</h4>
      </div>
    </>
  )
}
