import 'package:flutter/material.dart';
import '../model/metadata.dart' as metadata;

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // MetaData? metadata;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment(-1.0, -0.15),
          end: Alignment(1.0, 0.15),
          stops: [0.0, 0.42, 0.95, 1.0],
          colors: <Color>[
            Color.fromRGBO(178, 242, 187, 1.0),
            Color.fromRGBO(153, 233, 242, 1.0),
            Color.fromRGBO(165, 216, 255, 1.0),
            Color.fromRGBO(165, 216, 255, 1.0)
          ]
        )
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          toolbarHeight: 108,
          centerTitle: true,
          title: Row(
            children: [
              Expanded(
                child: Text(
                  'Music Player',
                  softWrap: true,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ),
              Container(width: 70)
            ],
          ),
        ),
        body: Container(
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.only(topLeft: Radius.circular(15.0), topRight: Radius.circular(15.0)),
            color: Color.fromRGBO(248, 249, 250, 1.0),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  // metadata.MetaData.fromJson() ?? 'No title available',
                  'No title available',
                  style: TextStyle(fontSize: 18),
                ),
                SizedBox(height: 10),
                // Text(
                //   'Artist: ${metaData.artist ?? 'Unknown'}', 
                //   style: TextStyle(fontSize: 18),
                // ),
                // SizedBox(height: 10),
                ElevatedButton(onPressed: (){
                  print(metadata.MetaData.fromJson.toString());
                }, child: Text('MetaData'))
              ],
            )
          ),
        ),
      ),
    );
  }
}