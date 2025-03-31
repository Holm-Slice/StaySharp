import React from "react";

export const EmailForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  return (
    <>
      {" "}
      <form action="" onSubmit={handleSubmit} className="emailForm">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          cols={30}
          rows={10}
          type="message"
          placeholder=""
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button></button>
      </form>
    </>
  );
};
