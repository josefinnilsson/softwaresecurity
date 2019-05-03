/* $Id: ChatClient.java 723 2009-09-24 07:48:58Z cartho $ */

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;

public class ChatClient {
    int id;
    static int currID = 0;

    public final static void main(String args[]) {
        new ChatClient().exec();
    }

    public ChatClient() {
        synchronized(getClass()) {
            id = currID++;
        }
    }

    public void exec() {
        try {
            Socket socket = new Socket();
            InetSocketAddress addr = new InetSocketAddress("localhost", 4444);
            socket.connect(addr);
            System.out.println("Client " + id + " connected.");
            InputStreamReader istr =
                new InputStreamReader(socket.getInputStream());
            BufferedReader in = new BufferedReader(istr);
            BufferedWriter out =
                new BufferedWriter(new PrintWriter(socket.getOutputStream()));
            out.write("Hello, world!\n");
            out.flush();
            String input;
            while ((input = in.readLine()) != null) {
              assert (input.equals("Server busy") || input.matches("\\[\\d+\\]\\d+: (.*)") ||
              input.matches("Client \\d+ quit."));
                System.out.println(id + ": Received " + input);
            }
            in.close();
            out.close();
        } catch(IOException e) {
            System.err.println("Client " + id + ": " + e);
        }
    }
}
