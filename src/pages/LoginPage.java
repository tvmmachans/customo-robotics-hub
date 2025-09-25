import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class LoginPage extends JFrame implements ActionListener {

    private JTextField userField;
    private JPasswordField passField;
    private JButton loginButton, resetButton;

    public LoginPage() {
        // Frame settings
        setTitle("Login Page");
        setSize(400, 250);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Center screen
        setResizable(false);

        // Use GridBagLayout for neat alignment
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Username label + field
        JLabel userLabel = new JLabel("Username:");
        userLabel.setFont(new Font("Arial", Font.PLAIN, 14));
        gbc.gridx = 0; gbc.gridy = 0;
        panel.add(userLabel, gbc);

        userField = new JTextField(15);
        gbc.gridx = 1; gbc.gridy = 0;
        panel.add(userField, gbc);

        // Password label + field
        JLabel passLabel = new JLabel("Password:");
        passLabel.setFont(new Font("Arial", Font.PLAIN, 14));
        gbc.gridx = 0; gbc.gridy = 1;
        panel.add(passLabel, gbc);

        passField = new JPasswordField(15);
        gbc.gridx = 1; gbc.gridy = 1;
        panel.add(passField, gbc);

        // Buttons
        loginButton = new JButton("Login");
        loginButton.setBackground(new Color(0, 153, 76));
        loginButton.setForeground(Color.WHITE);
        loginButton.setFocusPainted(false);

        resetButton = new JButton("Reset");
        resetButton.setBackground(new Color(204, 0, 0));
        resetButton.setForeground(Color.WHITE);
        resetButton.setFocusPainted(false);

        loginButton.addActionListener(this);
        resetButton.addActionListener(this);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(loginButton);
        buttonPanel.add(resetButton);

        gbc.gridx = 0; gbc.gridy = 2; gbc.gridwidth = 2;
        panel.add(buttonPanel, gbc);

        add(panel);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == loginButton) {
            String username = userField.getText();
            String password = String.valueOf(passField.getPassword());

            if (username.equals("admin") && password.equals("1234")) {
                JOptionPane.showMessageDialog(this, "✅ Login Successful!");
                // Open Dashboard and close login window
                new Dashboard();
                this.dispose();
            } else {
                JOptionPane.showMessageDialog(this, "❌ Invalid Username or Password.");
            }
        } else if (e.getSource() == resetButton) {
            userField.setText("");
            passField.setText("");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(LoginPage::new); // Run in Event Dispatch Thread
    }
}

// Minimal Dashboard class to show after login
class Dashboard extends JFrame {
    public Dashboard() {
        setTitle("Dashboard");
        setSize(400, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        JLabel label = new JLabel("Welcome to the Dashboard!", SwingConstants.CENTER);
        add(label);
        setVisible(true);
    }
}