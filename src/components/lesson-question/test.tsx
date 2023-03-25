import { useEffect, useState } from "react"
let timer: any; // 1 计时器
const Reject = () => {
  const [progress, setProgress] = useState<number>(45);

  useEffect(() => {
    setTimer() // 调用函数
    return () => {
      clearInterval(timer)
    }
  }, [])

  const setTimer = () => {
    timer = setInterval(() => {
      setProgress(n => {
        if (n + 3 <= 100) {
          return n + 3
        } else {
          clearInterval(timer)
          return 0
        }
      });
    }, 1000)
  }

  const stopFn = () => {
    clearInterval(timer)
  }

  return <div>
    进度：{progress}
    <button onClick={() => stopFn()}>stop</button>
  </div>
}
export default Reject;