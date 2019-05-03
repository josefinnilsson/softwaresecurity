package env.java.util.concurrent;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.TimeUnit;

/** ThreadPoolExecutor stub that either launches a thread or rejects it right
    away. Does not manage a thread pool or use a thread of its own, to be
    lightweight enough for JPF. */

public class ThreadPoolExecutor {
  int corePoolSize;
  int maximumPoolSize;
  long keepAliveTime;
  TimeUnit unit;
  SynchronousQueue workQueue;
  RejectedEH handler;
  int activeThreads;
    public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize,
			      long keepAliveTime, TimeUnit unit,
			      BlockingQueue<Runnable> workQueue,
			      RejectedEH handler) {
              this.corePoolSize = corePoolSize;
              this.maximumPoolSize = maximumPoolSize;
              this.keepAliveTime = keepAliveTime;
              this.unit = unit;
              this.workQueue = (SynchronousQueue) workQueue;
              this.handler = handler;
              activeThreads = 0;
    }

    public void shutdown() { } // stub

    public synchronized void execute(Runnable r) {
      if(activeThreads<maximumPoolSize){
        new Thread(r).start();
        activeThreads++;
      } else {
        handler.rejectedExecution(r,this);
      }
    }
}
