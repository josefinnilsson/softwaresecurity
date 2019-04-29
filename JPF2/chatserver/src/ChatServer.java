import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.locks.ReentrantLock;
import gov.nasa.jpf.vm.Verify;
import env.java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.SynchronousQueue;
import env.java.util.concurrent.RejectedExecutionHandler;


class Worker implements Runnable {
    Socket sock;
    PrintWriter out;
    BufferedReader in;
    ChatServer chatServer;
    int idx;

    public Worker(Socket s, ChatServer cs) throws IOException {
        chatServer = cs;
        sock = s;
        if(Verify.getBoolean()){
          out = new PrintWriter(sock.getOutputStream(), true);
        }
        if(Verify.getBoolean()){
          in = new BufferedReader(new InputStreamReader(sock.getInputStream()));
        }
        if(out == null||in == null){
          throw new IOException();
        }
    }

    public void run() {
        System.out.println("Thread running: " + Thread.currentThread());
        chatServer.lock.lock();
        idx = chatServer.n;
        chatServer.n++;
        chatServer.lock.unlock();
        try {
            assert (out != null);
            chatServer.lock.lock();
            assert (chatServer.workers[idx] == null);
            chatServer.workers[idx] = this;
            chatServer.lock.unlock();
            System.out.println("Registered worker " + idx + ".");
            String s = null;
            while ((s = in.readLine()) != null) {
                chatServer.sendAll("[" + idx + "]" + s);
            }
            sock.close();
        } catch (IOException ioe) {
            System.out.println("Worker thread " + idx + ": " + ioe);
        } finally {
            chatServer.remove(idx);
        }
    }

    public void send(String s) {
        out.println(s);
    }
}

public class ChatServer {
    Worker workers[];
    int n = 0;
    ReentrantLock lock = new ReentrantLock();
    ThreadPoolExecutor executor;
    SynchronousQueue<Runnable> workQueue;
    RejectedExecutionHandler handler;

    public ChatServer(int maxServ) {
        int port = 4444;
        workers = new Worker[maxServ];
        Socket sock;
        ServerSocket servsock = null;
        workQueue = new SynchronousQueue<Runnable>();
        executor = new ThreadPoolExecutor(2, 0, 10, TimeUnit.SECONDS, workQueue, handler);
        try {
            servsock = new ServerSocket(port);
            while (maxServ-- != 0) {
                sock = servsock.accept();
                Worker worker = null;
                try{
                  worker = new Worker(sock, this);
                  executor.execute(worker);
                } catch(IOException e){
                  e.printStackTrace();
                  continue;
                }
            }
            servsock.close();
        } catch (IOException ioe) {
            System.err.println("Server: " + ioe);
        }
        executor.shutdown();
        System.out.println("Server shutting down.");
    }

    public static void main(String args[]) throws IOException {
        if (args.length == 0) {
            new ChatServer(-1);
        } else {
            new ChatServer(Integer.parseInt(args[0]));
        }
    }

    public synchronized void sendAll(String s) {
        int i;
        lock.lock();
        for (i = 0; i < n; i++) {
            if (workers[i] != null) {
                workers[i].send(s);
            }
        }
        lock.unlock();
    }

    public synchronized void remove(int i) {
        lock.lock();
        workers[i] = null;
        lock.unlock();
        sendAll("Client " + i + " quit.");
    }
}
