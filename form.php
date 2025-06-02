<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="whole.css">
  <link rel="stylesheet" href="style.css">
  <title>送信画面</title>
</head>

<body>
  <?php
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // ここに入力したい値を入れる(HTMLのnameを入れる)
    $name = htmlspecialchars($_POST["name"] ?? "", ENT_QUOTES, "UTF-8");
    $email = htmlspecialchars($_POST["email"] ?? "", ENT_QUOTES, "UTF-8");
    $tel = htmlspecialchars($_POST["tel"] ?? "", ENT_QUOTES, "UTF-8");
    $select = htmlspecialchars($_POST["select"] ?? "", ENT_QUOTES, "UTF-8");

    // 自分のメールアドレス
    $to = "自分のメルアド";

    // 件名
    $subject = "フォームからのお問い合わせ";

    // メール本文
    $message = "以下の内容が送信されました：\n\n";
    $message .= "名前: $name\n";
    $message .= "メールアドレス: $email\n";
    $message .= "電話番号: $tel\n";
    $message .= "人数: $select\n";

    // 送信ヘッダー（FROMを実在のアドレスにすると成功率が上がります）
    $headers = "From: 自分のメルアド\r\n";
    $headers .= "Reply-To: $email\r\n";

    // メール送信
    $mail_sent = mail($to, $subject, $message, $headers);

    if ($mail_sent) {
      echo "<p>メールを送信しました。ありがとうございました。</p>";

      $auto_subject = "【自動返信】お問い合わせありがとうございます";
      $auto_message = <<<EOT
$name 様

お問い合わせいただきありがとうございます。
以下の内容で受け付けました。

------------------------
名前: $name
メールアドレス: $email
電話番号: $tel
人数: $select
------------------------

内容を確認の上、ご連絡いたします。

（このメールは自動返信です）

EOT;

      $auto_headers = "From: 自分のメルアド\r\n"; //

      // 自動返信メール送信
      mail($email, $auto_subject, $auto_message, $auto_headers);
    } else {
      echo "<p>メールの送信に失敗しました。</p>";
    }
  }
  ?>
  <p><a href="index.html">トップに戻る</a></p>
</body>

</html>