package main

import (
    "encoding/json"
    "net/http"
    "log"
)

type FileNode struct {
    Name     string     `json:"name"`
    Type     string     `json:"type"` 
    Children []FileNode `json:"children,omitempty"`
}

func getMockTree() FileNode {
    return FileNode{
        Name: "root",
        Type: "folder",
        Children: []FileNode{
            { Name: "file1.txt", Type: "file" },
            {
                Name: "src",
                Type: "folder",
                Children: []FileNode{
                    { Name: "App.tsx", Type: "file" },
                    { Name: "Main.tsx", Type: "file" },
                },
            },
        },
    }
}

func treeHandler(w http.ResponseWriter, r *http.Request) {
    // Add CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
    w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

    // Handle preflight request
    if r.Method == http.MethodOptions {
        w.WriteHeader(http.StatusOK)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    tree := getMockTree()
    json.NewEncoder(w).Encode(tree)
}


func main() {
    http.HandleFunc("/api/tree", treeHandler)
    log.Println("Server running on http://localhost:8081")
    log.Fatal(http.ListenAndServe(":8081", nil))
}
