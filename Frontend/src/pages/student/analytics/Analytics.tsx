import ChartBar from '../../../templates/anayltics/Khra'
import ChartLine from '../../../templates/anayltics/LineChar'
import ChartBubble from '../../../templates/anayltics/Points'

const StudentAnalytics = () => {
  return (
    <div>
      <div style={{ marginBottom: "9%" }}>
        <ChartBar></ChartBar>
      </div>
      <div style={{ marginBottom: "9%" }}>
        <ChartLine></ChartLine>
      </div>
      <div style={{ marginBottom: "9%" }}>
        <ChartBubble></ChartBubble>
      </div>
    </div>
  )
}

export default StudentAnalytics
