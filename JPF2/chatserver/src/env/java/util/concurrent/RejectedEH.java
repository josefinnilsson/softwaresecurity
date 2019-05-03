package env.java.util.concurrent;

public class RejectedEH implements RejectedExecutionHandler {
  public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
    System.out.println("RejectedExecution thrown!");
  }
}
