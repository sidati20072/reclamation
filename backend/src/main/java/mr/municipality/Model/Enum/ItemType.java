package mr.municipality.Model.Enum;

public enum ItemType {
    COURSE("course"),
    ITEM("item");
    private String name = "";

    ItemType(String name){
        this.name = name;
    }

    public String toString(){
        return name;
    }
}

